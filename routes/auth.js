let express = require('express')
let router = express.Router()

const {signUp, getAllUser, signIn, verifyMail, signOut} = require('../controllers/userController')

router.get('/',getAllUser)
router.post('/signup',signUp)
router.post('/signin',signIn)
router.post('/signout/:id',signOut)
router.get('/verify/:code',verifyMail)

module.exports = router