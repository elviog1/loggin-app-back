let express = require('express')
let router = express.Router()
const passport = require('passport')

const {createComment, getAllComment, deleteComment} = require('../controllers/commentControllers')

router.get('/',getAllComment)
router.post('/',createComment)
router.delete('/:id',deleteComment)

module.exports = router