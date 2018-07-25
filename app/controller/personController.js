const Person = require('../models/Person');
const multer = require('multer');
const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter(req, file, next){
        const isPhoto = file.mimetype.startsWith('image/');
        if(isPhoto){
            next(null, true);
        }else{
            next({message: 'That filetype isn\'t allowed'}, false)
        }
    }
};

exports.upload = multer(multerOptions).single('photo');

//create
exports.createPerson = async (req, res) => {
    try {
        const { credentials } = req.body;
        const person = new Person(...credentials);
        await person.save((err, person)=>{
            if (err) {
                res.send({'error': 'An error has occured'});
            } else {
                res.json(person); 
            }
        });
    } catch (error) {
        console.log(error)
    }
}

//read
exports.getPersons = async (req, res) => {
    try {
        const person = await Person.find((err, res) => {
            if (err) {
                res.send({'error': 'An error has occured'});
            } else {
                res.json(person)
            }
        })
    } catch (error) {
        console.log(error);
    }
}

exports.getOnePerson = async (req, res) => {
    try {
        const id = req.params._id;
        const person = await Person.findById(id, (err, res) => {
            if (err) {
                res.send({'error': 'An error has occured'});
            } else {
                res.json(person)
            }
        })
    } catch (error) {
        console.log(error);
    }
}

//update 
exports.updatePerson = async (req, res) => {
    try {
        const id = req.params._id;
        const person = await Person.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true
        }, (req, res) => {
            if (err) {
                res.send({'error': 'An error has occured'});
            } else {
                res.json(person)
            }
        })
    } catch (error) {
        console.log(error)
    }
}

//delete

exports.deletePerson = async (req, res)=>{
    try {
        const id = req.params._id
        await Person.findOneAndRemove({_id: id}, (err, res)=>{
            if (err) {
                res.send({'error': 'An error has occured'});
            } else {
                res.send('Person' + id + 'deleted');
            }
        })
    } catch (error) {
        console.log(error);
    }
}