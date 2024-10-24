const express = require('express')
const { UserModel } = require('../models/user.model')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer') //this is installed so as to send email

const registerUser = (req, res)=>{
    const { fullname, email, password } = req.body

    const user = new UserModel({
        fullname, 
        email,
        password
    })
    user.save()
    .then((data)=>{

        //nodemailer is installed to send email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.APP_EMAIL,
                pass: process.env.PASS
            }
        })

        const mailOptions = {
            from: process.env.APP_EMAIL,
            to: [data.email, process.env.APP_EMAIL],
            subject: 'DEH PLAY',
            text: `Hello ${data.fullname}, welcome to anywhere you landed. `
        }
        transporter.sendMail(mailOptions, (error, info)=>{
            if(error){
                console.log('Could not send email');
                
            }

            else{
                console.log('Email sent', info.response);
                
            }
        })
        res.send({status:true, message: "Registration Succesful!" ,data})
    })
    .catch((err)=>{
        res.send({status:false, message:('Unable to register')})
    })

}

const loginUser = (req, res)=>{
    const { email, password } = req.body
    UserModel.findOne({email})
    .then((data)=>{
        if(data){
            data.validatePassword(password, (err, isMatch)=>{
                if(isMatch){
                    const token = jwt.sign({id:data._id}, process.env.SECRET_KEY, {expiresIn: '1h'} )
                    res.send({
                        status: true,
                        message: "Login successfully",  data, token
                    })
                }
                else{
                    res.send({
                        status:false,
                        message: "Invalid email or Password"
                    })
                }
            })
        }

        else{
            res.send({
                status: false,
                message: "Email not found"
            })
        }
    })
    .catch((err)=>{
        res.send({
            status: false,
            message: `error occured: ${err.message}`
        })
    })
}

const verifyAUth = (req, res, next) =>{
    let token = req.headers.authorization
    if (token){
        token = token.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
            if(err){
                res.send({status: false, message: "Invalid Token"})
            }
            else{
                id = decoded.id
                UserModel.findOne({_id:id})
                .then((data)=>{
                    if (data){
                        next()
                        res.send({status:true, message: "Token Verified", data:decoded})
                    }else{
                        res.send({status: false, message: "Invalid Token"})
                    }
                })
                .catch((err)=>{
                    res.send({status: false, message: "Error Validating Token"})
                })
            }
        })
    }
    else{
        res.send({status: false, message: "No Token Provided"})
    }
    
}





module.exports = { registerUser, loginUser, verifyAUth }