var express = require('express');
var router = express.Router();
const userRouter = require('./auth')
const commentRouter = require('./comment')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({title:"hola"});
});

router.use('/auth',userRouter)
router.use('/comment',commentRouter)

module.exports = router; 
