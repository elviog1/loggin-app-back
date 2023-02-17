const User = require('../models/User')
const crypto = require('crypto')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sendMail = require('../config/sendMail')
const userController = {
    signUp: async(req,res) =>{
        let {name,lastName,email,password,country,from,role,photo} = req.body
        try {
            let user = await User.findOne({email})
            if(!user){
                let logged = false
                let verified = false
                let code = crypto.randomBytes(15).toString('hex')
                if(from === 'form'){
                    password= bcryptjs.hashSync(password,10)
                    user = await new User({name,lastName,email,password:[password],country,role,from:[from],logged,verified,code,photo}).save()
                    sendMail(email,code)
                    res.status(200).json({
                        message: 'user sign up from FORM',
                        success: true,
                        code:code
                    })
                }else{
                    password = bcryptjs.hashSync(password,10)
                    verified = true
                    user = await new User({
                        name,lastName,email,password:[password],country,role,from:[from],logged,verified,code,photo
                    }).save()
                    res.status(200).json({
                        message: 'user signed up from ' + from,
                        success: true
                    })
                }
                

            }else{
                if(user.from.includes(from)){
                    res.status(200).json({
                        message: 'user already exist',
                        success: false
                    })
                }else{
                    user.from.push(from),
                    user.verified = true,
                    user.password.push(bcryptjs.hashSync(password,10))
                    await user.save()
                    res.status(201).json({
                        message: 'user signed up from ' + from,
                        success: true
                    })
                }
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: error.message,
                success: false
            })
        }
    },
    getAllUser : async(req,res) =>{
        let query ={}
        let users
        try {
            users = await User.find(query)
            res.status(200).json({
                message: "all user found",
                response: users,
                success: true
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: "couldn't find users",
                success: false,
            })
        }
    },
    signIn: async(req,res) =>{
        const {email,password,from} = req.body
        try {
            let user = await User.findOne({email})
            if(!user){
                res.status(404).json({
                    message: "User doesn't exist, please sign up",
                    success:false
                })
            }else if(user.verified){
                const checkPass = user.password.filter(passwordElement => bcryptjs.compareSync(password,passwordElement))
                if(from === "form"){
                    if(checkPass.length >0){
                        const loginUser = {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            photo:user.photo,
                            country:user.country
                        }
                        user.logged = true
                        await user.save()
                        // const token = jwt.sign({user})
                        res.status(200).json({
                            message: "Welcome " + user.name,
                            success: true,
                            response: {loginUser}
                        })
                    }else {
                        res.status(400).json({
                            message: "Username or password incorrect",
                            success:false
                        })
                    }
                }else{
                    if(checkPass.length > 0){
                        const loginUser = {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            photo:user.photo,
                            country:user.country
                        }
                        user.logged = true
                        await user.save()
                        res.status(200).json({
                            message: "Welcome " + user.name,
                            success: true,
                            response: loginUser
                        })
                    }else{
                        res.status(400).json({
                            message: "invalid credentials",
                            success:false
                        })
                    }
                }
            }else {
                res.status(401).json({
                    success: false,
                    message: "Please, verify your email account and try again"
                })
            }
        } catch (error) {
            console.log(error)
            res.status(404).json({
                message: "Sign in ERROR, try again later",
                success: false,
            })
        }
    },
    verifyMail: async(req,res) =>{
        const {code} = req.params
        try {
            let user = await User.findOne({code})
            console.log(code)
            if(user){
                user.verified = true
                await user.save()
                res.status(200).redirect(301, 'http://localhost:5173')
            }else{
                res.status(400).json({
                    message: "error, this email doesn't have an acoount",
                    success: false
                })
            }
            
        } catch (error) {
            console.log(error)
            res.status(404).json({
                message:"couldn't sign up",
                success:false
            })
        }
    },
    signOut: async(req,res) =>{
        const {email} = req.params
        try {
            let user = await User.findOne({email:email})
            if(user){
                user.logged = false
                await user.save()
                res.status(200).json({
                    message: "User disconnected",
                    succes: true
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: error.message,
                success: false
            })
        }
    }

}

module.exports = userController