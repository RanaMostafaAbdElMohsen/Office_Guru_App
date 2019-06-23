var express = require('express');
var router = express.Router();
var taskcontroller = require('../controllers/task.js');


router.post('/createtask', taskcontroller.add);
router.post('/modifytask',taskcontroller.modify);
router.post('/deletetask',taskcontroller.delete);
router.post('/deletetaskbylist',taskcontroller.deletebylist);
router.post('/findtask',taskcontroller.find);
router.get('/findalltask',taskcontroller.findall);

module.exports = router;