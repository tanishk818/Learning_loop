const express=require('express')
var app=express.Router();



app.get('/',(req,res)=>{
    // res.sendFile(path.join(__dirname+'/lev1.html'));
    res.render('index.ejs')
 });
 app.get('/tutorial',(req,res)=>{
    // res.sendFile(path.join(__dirname+'/lev1.html'));
    res.render('tutorial.ejs')
 });
 app.get('/intro',(req,res)=>{
    // res.sendFile(path.join(__dirname+'/lev1.html'));
    res.render('intro.ejs')
 });

module.exports=app