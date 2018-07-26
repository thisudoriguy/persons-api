const Person = require('../models/Person');

//create
exports.createPerson = async (req, res) => {
    const credentials = {
        name: req.body.name,
        age: req.body.age,
        description: req.body.description,
        photo: req.file.path 
    }
    const new_person = new Person(credentials);

    new_person.save(function(err, person) {
    if (err)
      res.send(err);
      res.status(200).json(person);
  });

}

//read
exports.getPersons = (req, res) => {
    Person.find({}, function(err, person) {
        if (err)
          res.send(err);
          res.status(200).json(person);
      });
}

exports.getOnePerson = async (req, res) => {

    Person.findById(req.params.personId, function(err, person) {
        if (err)
          res.send(err);
          res.status(200).json(person);
      });

}

//update 
exports.updatePerson = async (req, res) => {

    Person.findOneAndUpdate({_id: req.params.personId}, req.body, {new: true}, function(err, person) {
        if (err)
          res.send(err);
          res.status(200).json(person);
      });

}

//delete

exports.deletePerson = async (req, res) => {

    Person.remove({
        _id: req.params.personId
      }, function(err, person) {
        if (err)
          res.send(err);
          res.status(200).json({ message: 'person successfully deleted' });
      });

}