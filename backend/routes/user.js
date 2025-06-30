var express = require('express');
let authMiddleware = require('../middleware/auth_middleware');
var router = express.Router();

/* GET home page. */
router.get('/', authMiddleware.checkAuthorize, function(req, res, next) {
  res.status(200).json({
    message: 'Successful',
    data: []
  })
});

module.exports = router;
