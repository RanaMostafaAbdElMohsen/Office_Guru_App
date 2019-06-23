var express = require('express');
var router = express.Router();
var listcontroller = require('../controllers/list.js');


router.post('/addlist', listcontroller.add);
router.post('/modifylist',listcontroller.modify);
router.post('/deletelist',listcontroller.delete);
router.get('/findlist',listcontroller.find);

module.exports = router;