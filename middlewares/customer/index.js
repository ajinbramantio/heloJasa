const express = require('express')
const router = express.Router()

const controller = require('./controller')

router.get('/', controller.getCustomer)
router.post('/register', controller.registerCustomer)
router.post('/login', controller.loginCustomer)
router.get('/profile/:id', controller.getUserById)

module.exports = router
