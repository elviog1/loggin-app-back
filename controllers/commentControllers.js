const Comment = require('../models/Comment')

const commentControllers = {
    createComment: async(req,res)=>{
        const {comment,user} = req.body
        // let user = req.user.id
        console.log(req)
        try {
            await new Comment({comment,user}).save()
            res.status(200).json({
                message: 'Comment created',
                success:true
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: error.message,
                success:false
            })
        }
    },
    getAllComment: async(req,res)=>{
        let query = req.body
        let comments
        try {
            comments = await Comment.find(query)
            .populate('user',{photo:1,name:1})
            res.status(200).json({
                message: "All comment found",
                response: comments,
                success:true
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: error.message,
                success:false
            })
        }
    }
}

module.exports = commentControllers