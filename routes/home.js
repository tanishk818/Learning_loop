const express=require('express');
const router=express.Router();
const User=require('../models/user');
const passport = require('passport');
const {isAdmin} =require('../middleware');
const mongoose = require('mongoose');
const { userSchema,LoginSchema } = require('../Schema.js');
const nodemailer = require("nodemailer");
async function main() {
   var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "9d225d8ece525c",
        pass: "a7f60638bb35ce"
      }
    });
   var mailOptions = {
         from: "tanishk145@gmail.com",
         to: "tanishkagarwal818@gmal.com",
         subject: "Subject",
         text: "Hello SMTP Email"
   };

   transport.sendMail(mailOptions, function(err, info){
       transport.close();
       if(err) {
           callback(err, info);
       }
       else {
           callback(null, info);
       }
   });
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
   res.render('index.ejs')
})
router.get("/level",(req,res)=>{
   res.send("level page")
})
router.get("/help",(req,res)=>{
   res.render('contact.ejs')
})

router.get("/admin",isAdmin,async(req,res)=>{
   let noOfLevels=5;
   let users=await User.find({});
   
   if(req.user.username=="admin")
   res.render("admin.ejs",{users,noOfLevels});
   else{
      req.flash('error','you must be log in as an admin to access the admin site');
      res.redirect('/lev/1');
   }
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
        let maxLevel="0"
        try{
          
         const {username,email,password}=req.body;
         const user=new User({email,maxLevel,username});
         const registeredUser =await User.register(user,password);
         req.login(registeredUser,err =>{
         
          if(err) return next(err);
          console.log(req.registeredUser);
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
      req.flash('success','welcome back!'+req.user.username);
      var redirectUrl;
      if(req.user.username=="admin")
      redirectUrl='/admin';
      else
      redirectUrl='/lev/1';
      delete req.session.returnTo;
      res.redirect(redirectUrl);
  })
  
  router.get('/logout',(req,res)=>{
   req.logOut();
   req.flash('success','successfully logout');
   res.redirect('/login');
})





module.exports=router;
