let express = require('express')
let router = express.Router()
const passport = require('passport')

const {createComment, getAllComment} = require('../controllers/commentControllers')

router.get('/',getAllComment)
router.post('/',createComment)

module.exports = router