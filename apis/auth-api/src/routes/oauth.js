const router = require('express').Router()

const OAuthController = require('../controllers/OAuthController')

router.get('/', OAuthController.get)

module.exports = router
