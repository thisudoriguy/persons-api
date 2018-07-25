const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const port = process.env.PORT||3000;
const routes = require('./app/routes/index');
require('dotenv').config()

//connect to mongoose
//change the mlab db
//remove this dotenv url when you are done
const mongoDB = process.env.DATABASE || 'mongodb://person-api:12345678q@ds253821.mlab.com:53821/accelerex_api';
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express(); 

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes)

app.listen(port, ()=>{
    console.log('Listening on port' + ' '+ port);
})
