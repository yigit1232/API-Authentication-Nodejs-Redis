const router = require('express').Router()
const indexController = require('../controllers/index.controller')

router.get('/', indexController.index)
router.post('/register', indexController.register)
router.post('/login', indexController.login)

module.exports = router