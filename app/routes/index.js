const express = require('express');
const router = express.Router();
const personController = require('../controller/personController'); 
const imageHandler = require('../handlers/handler')

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploads/')
    },
    filename: (req, file, cb)=>{
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname )
    },
    fileFilter: (req, file, cb) =>{
        const isPhoto = file.mimetype.startsWith('image/');
        if (isPhoto) {
            next(null, true);
        } else {
            next({ message: 'That filetype isn\'t allowed' }, false)
        }
    }
})

const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 *5 
}})

router.get('/', (req, res) => {
    res.json({STATUS: 'OPERATING'})
});
router.post('/persons/create', upload.single('photo'), imageHandler.imageHandler, personController.createPerson);
router.get('/persons', personController.getPersons);
router.get('/persons/:_id', personController.getOnePerson);
router.put('/persons/edit/:_id', personController.updatePerson);
router.delete('/persons/:_id', personController.deletePerson); 

module.exports = router;