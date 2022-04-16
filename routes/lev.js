const express=require('express');
const router=express.Router();
const {isLoggedIn} =require('../middleware');
const User=require('../models/user');

var updateMaxLevel=async (level,user)=>{
   user[0].maxLevel=level;
   await User.findByIdAndUpdate(user[0]._id,user[0]);
   
}
router.get('/1',isLoggedIn,async(req,res)=>{
   // res.sendFile(path.join(__dirname+'/lev1.html'));
   res.render('lev1.ejs')
});
router.get('/2',isLoggedIn,async (req,res)=>{
   let user=await User.find({username:req.user.username});
   updateMaxLevel("1",user);
    // res.sendFile(path.join(__dirname+'/lev1.html'));
    res.render('lev2.ejs')
 });
 router.get('/3',isLoggedIn,async (req,res)=>{
   let user=await User.find({username:req.user.username});
   updateMaxLevel("2",user);
    // res.sendFile(path.join(__dirname+'/lev1.html'));
    res.render('lev3.ejs')
 });
 router.get('/4',isLoggedIn,async (req,res)=>{
   let user=await User.find({username:req.user.username});
   updateMaxLevel("3",user);
    // res.sendFile(path.join(__dirname+'/lev1.html'));
    res.render('lev4.ejs')
 });
 router.get('/5',isLoggedIn,async (req,res)=>{
   let user=await User.find({username:req.user.username});
   updateMaxLevel("4",user);
    // res.sendFile(path.join(__dirname+'/lev1.html'));
    res.render('lev5.ejs')
 });
 router.get('/6',isLoggedIn,async (req,res)=>{
   let user=await User.find({username:req.user.username});
   updateMaxLevel("5",user);
    // res.sendFile(path.join(__dirname+'/lev1.html'));
    res.render('lev6.ejs')
 });
 router.get('/7',isLoggedIn,async (req,res)=>{
   let user=await User.find({username:req.user.username});
   updateMaxLevel("6",user);
    // res.sendFile(path.join(__dirname+'/lev1.html'));
    res.render('lev7.ejs')
 });
 router.get('/8',isLoggedIn,async (req,res)=>{
   let user=await User.find({username:req.user.username});
   updateMaxLevel("7",user);
    // res.sendFile(path.join(__dirname+'/lev1.html'));
    res.render('lev8.ejs')
 });
 router.get('/9',isLoggedIn,async (req,res)=>{
   let user=await User.find({username:req.user.username});
   updateMaxLevel("8",user);
    // res.sendFile(path.join(__dirname+'/lev1.html'));
    res.render('lev9.ejs')
 });
module.exports=router;

