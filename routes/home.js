const express=require('express');
const router=express.Router();
const User=require('../models/user');
const passport = require('passport');

const mongoose = require('mongoose');
const { userSchema,LoginSchema } = require('../Schema.js');
const nodemailer = require("nodemailer");
async function main() {
   // Generate test SMTP service account from ethereal.email
   // Only needed if you don't have a real mail account for testing
   let testAccount = await nodemailer.createTestAccount();
 
   // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport({
     host: "smtp.ethereal.email",
     port: 587,
     secure: false, // true for 465, false for other ports
     auth: {
       user: testAccount.user, // generated ethereal user
       pass: testAccount.pass, // generated ethereal password
     },
   });
 
   // send mail with defined transport object
   let info = await transporter.sendMail({
     from: '"Fred Foo 👻" <tanishk145@gmail.com>', // sender address
     to: "tanishkagarwal818@gmail.com", // list of receivers
     subject: "Hello ✔", // Subject line
     text: "Hello world?", // plain text body
     html: "<b>Hello world?</b>", // html body
   });
 
   console.log("Message sent: %s", info.messageId);
   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
 
   // Preview only available when sending through an Ethereal account
   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
 }

const validate = (req, res, next) => {
   const { error } = userSchema.validate(req.body);
   console.log(error)
   if (error) {
      req.flash('error',error.details.map(el => el.message).join(','));
      res.redirect('/login')
   } else {
       next();
   }
}
const loginValidate = (req, res, next) => {
   const { error } = LoginSchema.validate(req.body);
   console.log(error)
   if (error) {
      req.flash('error',error.details.map(el => el.message).join(','));
      res.redirect('/login')
   } else {
       next();
   }
}
router.get("/",(req,res)=>{
   main().catch(console.error)
   res.render('index.ejs')
})
router.get('/login',(req,res)=>{
   res.render('login.ejs')
})


router.post('/Signup',validate,async(req,res,next)=>{
   let oldUser = await User.findOne({ email: req.body.email });
   console.log(oldUser);
    if (oldUser) {
        req.flash('error','User already exist')
        res.redirect('/login')
    } else {
        // Insert the new user if they do not exist yet
        try{
         const {username,email,password}=req.body;
         const user=new User({email,username});
         const registeredUser =await User.register(user,password);
         req.login(registeredUser,err =>{
          if(err) return next(err);
          req.flash('success','welcome to Learning Loop');
          res.redirect('/lev/1');
        })
      }
        catch(e){
         req.flash('error',e.message);
         res.redirect('login');
      }
      }
      
   })
   
   router.post('/login',passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),(req,res)=>{
      req.flash('success','welcome back!');
      const redirectUrl=req.session.returnTo || '/lev/1';
      delete req.session.returnTo;
      res.redirect(redirectUrl);
  })
  
  router.get('/logout',(req,res)=>{
   req.logOut();
   req.flash('success','successfully logout');
   res.redirect('/login');
})





module.exports=router;
