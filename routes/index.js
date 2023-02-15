var express = require('express');
var router = express.Router();
const userRouter = require('./auth')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({title:"hola"});
});

router.use('/auth',userRouter)

module.exports = router; 
