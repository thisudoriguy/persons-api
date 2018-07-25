const express = require('express');
const router = express.Router();
const personController = require('../controller/personController');

router.get('/', (req, res) => {
    res.json({STATUS: 'OPERATING'})
});
router.post('/persons/create', personController.createPerson);
router.get('/persons', personController.getPersons);
router.get('/persons/:_id', personController.getOnePerson);
router.put('/persons/edit/:_id', personController.updatePerson);
router.delete('/persons/:_id', personController.deletePerson);

module.exports = router;