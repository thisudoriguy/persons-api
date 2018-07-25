const Person = require('../models/Person');
const multer = require('multer');

const multerOptions = {
    storage: multer.diskStorage({
        destination: function (req, file, cb){
            cb(null, '/uploads/images')
        }
    }),
    fileFilter(req, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');
        if (isPhoto) {
            next(null, true);
        } else {
            next({ message: 'That filetype isn\'t allowed' }, false)
        }
    }
};

exports.upload = multer(multerOptions).single('photo');

//create
exports.createPerson = async (req, res) => {
    const new_person = new Person(req.body);
    new_person.save(function(err, person) {
    if (err)
      res.send(err);
    res.json(person);
  });

}

//read
exports.getPersons = (req, res) => {
    Person.find({}, function(err, person) {
        if (err)
          res.send(err);
        res.json(person);
      });
}

exports.getOnePerson = async (req, res) => {

    Person.findById(req.params.personId, function(err, person) {
        if (err)
          res.send(err);
        res.json(person);
      });

}

//update 
exports.updatePerson = async (req, res) => {

    Person.findOneAndUpdate({_id: req.params.personId}, req.body, {new: true}, function(err, person) {
        if (err)
          res.send(err);
        res.json(person);
      });

}

//delete

exports.deletePerson = async (req, res) => {

    Person.remove({
        _id: req.params.personId
      }, function(err, person) {
        if (err)
          res.send(err);
        res.json({ message: 'person successfully deleted' });
      });

}