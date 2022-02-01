const petController = require('../controllers/petController')
const checkPetData = require('../middleware/validate')

const router = require('express').Router()

router.get('/pets', petController.getPets)
router.get('/pets/:id',petController.getPet)
router.post('/pets', checkPetData, petController.addPet)
router.put('/pets/:id', checkPetData, petController.updatePet)
router.delete('/pets/:id', petController.deletePet)


module.exports = router;