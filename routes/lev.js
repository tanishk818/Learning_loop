const express=require('express')
var app=express.Router();




    app.get('/1',(req,res)=>{
        // res.sendFile(path.join(__dirname+'/lev1.html'));
        res.render('lev1.ejs')
     });
     app.get('/2',(req,res)=>{
         // res.sendFile(path.join(__dirname+'/lev1.html'));
         res.render('lev2.ejs')
      });
      app.get('/3',(req,res)=>{
         // res.sendFile(path.join(__dirname+'/lev1.html'));
         res.render('lev3.ejs')
      });
      app.get('/4',(req,res)=>{
         // res.sendFile(path.join(__dirname+'/lev1.html'));
         res.render('lev4.ejs')
      });
      app.get('/5',(req,res)=>{
         // res.sendFile(path.join(__dirname+'/lev1.html'));
         res.render('lev5.ejs')
      });

module.exports=app