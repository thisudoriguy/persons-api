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
mongoose.connect(process.env.DATABASE);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express(); 

app.use(cors());
app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes)

app.listen(port, ()=>{
    console.log('Listening on port' + ' '+ port);
})
