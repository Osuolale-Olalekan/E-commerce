const express = require('express')
const { UserModel } = require('../models/user.model')

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
                    res.send({
                        status: true,
                        message: "Login successfully",  data
                    })
                }
                else{
                    res.send({
                        status:false,
                        message: "Invalid Password"
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






module.exports = { registerUser, loginUser }