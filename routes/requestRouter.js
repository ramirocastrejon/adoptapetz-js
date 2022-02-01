
const requestController = require('../controllers/requestController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

const router = require('express').Router()

router.route('/requests')
.get(auth, authAdmin, requestController.getRequests)
.post(auth, requestController.createRequest)

module.exports = router;