let express = require('express')
let router = express.Router()
// let passport = require('../config/passport')
const {signUp, getAllUser, signIn, verifyMail, signOut,verifyToken, update, getUser} = require('../controllers/userController')

router.get('/',getAllUser)
router.get('/:id',getUser)
router.post('/signup',signUp)
router.post('/signin',signIn)
router.post('/signout/:email',signOut)
router.get('/verify/:code',verifyMail)
router.put('/:id',update)
// router.get('/token', passport.authenticate('jwt',{session:false}), verifyToken)

module.exports = router