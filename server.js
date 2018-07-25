const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const port = 3000;
const routes = require('./app/routes/index');

//connect to mongoose
//change the mlab db
const mongoose = require('mongoose');
const mongoDB = 'mongodb://locale_library:locale_library@ds153400.mlab.com:53400/locale_library';
mongoose.connect(mongoDB, {
  useMongoClient: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', routes)

app.listen(port, ()=>{
    console.log('Listening on port' + ' '+ port);
})
