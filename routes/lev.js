const express=require('express');
const router=express.Router();
const {isLoggedIn} =require('../middleware');


router.get('/1',isLoggedIn,(req,res)=>{
   // res.sendFile(path.join(__dirname+'/lev1.html'));
   res.render('lev1.ejs')
});
router.get('/2',isLoggedIn,(req,res)=>{
    // res.sendFile(path.join(__dirname+'/lev1.html'));
    res.render('lev2.ejs')
 });
 router.get('/3',isLoggedIn,(req,res)=>{
    // res.sendFile(path.join(__dirname+'/lev1.html'));
    res.render('lev3.ejs')
 });
 router.get('/4',isLoggedIn,(req,res)=>{
    // res.sendFile(path.join(__dirname+'/lev1.html'));
    res.render('lev4.ejs')
 });
 router.get('/5',isLoggedIn,(req,res)=>{
    // res.sendFile(path.join(__dirname+'/lev1.html'));
    res.render('lev5.ejs')
 });

module.exports=router;

