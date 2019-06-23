var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('ListPage', { title: 'Office Guru', user:'ranamostafamohsen96@yahoo.com', type: 'N' });
});

module.exports = router;