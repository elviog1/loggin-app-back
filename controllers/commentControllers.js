const Comment = require('../models/Comment')

const commentControllers = {
    createComment: async(req,res)=>{
        const {comment,user,date} = req.body
        // let user = req.user.id
        console.log(req)
        try {
            await new Comment({comment,user,date}).save()
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
            .populate('user',{photo:1,name:1,lastName:1,role:1,email:1,role:1,country:1})
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
    },
    deleteComment: async(req,res)=>{
        const {id} = req.params
        try {
            let comment =await Comment.findOneAndDelete({_id:id})
            if(comment){
                res.status(200).json({
                    message: 'Comment deleted successfully',
                    success:true
                })
            }else{
                res.status(404).json({
                    message: 'not comment found',
                    success:false
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: error.message,
                success: false
            })
        }
    },
    updateComment: async(req,res) =>{
        const {id} = req.params
        const updateComment =req.body
        try {
            const comment = await Comment.findOneAndUpdate({_id:id},updateComment,{new:true})
            if(comment){
                res.status(200).json({
                    message: 'Comment update successfully',
                    success:true,
                    response:comment
                })
            }else{
                res.status(404).json({
                    message: "Couldn't found comment",
                    success:false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: error.message,
                success: false,
        })
        }
    }
}

module.exports = commentControllers