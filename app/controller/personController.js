const Person = require('../models/Person');

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