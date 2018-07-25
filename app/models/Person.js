const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: 'Please enter a name'
    },
    age:{
        type: Number,
        required: 'Please enter persons age'
    },
    description:{
        type: String,
        required: 'Please enter persons description'
    },
    photo:{
        type: String
    },
    photo_thumb:{

    }
})

module.exports = mongoose.model('Person', personSchema);