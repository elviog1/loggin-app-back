let express = require('express')
let router = express.Router()
// let passport = require('../config/passport')

const {createComment, getAllComment, deleteComment, updateComment} = require('../controllers/commentControllers')

router.get('/',getAllComment)
router.post('/',createComment)
router.delete('/:id',deleteComment)
router.put('/:id',updateComment)

// router.post('/',passport.authenticate('jwt',{session:false}),createComment)
module.exports = router