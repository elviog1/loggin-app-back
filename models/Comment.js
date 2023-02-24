const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref:'users', required:true },
    comment: {type: String, required:true},
    date: {type: String, required:true},
})

const Comment = mongoose.model('comments', commentSchema)

module.exports = Comment