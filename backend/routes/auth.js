var express = require('express');
let authController = require('../controllers/auth_controller');
let {regValidatorMid, logValidatorMid} = require('../middleware/auth_validation_middleware')

var router = express.Router();

/* GET users listing. */
router.post('/signin', logValidatorMid, function(req, res) {
  authController.login(req, res);
});

router.post('/signup', regValidatorMid, function(req, res) {
  authController.register(req, res);
});

module.exports = router;
