var express = require('express');
var router = express.Router();
var notificationcontroller = require('../controllers/notification.js');


router.post('/addnotification', notificationcontroller.add);
router.post('/findnotification',notificationcontroller.findall);

module.exports = router;