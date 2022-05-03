const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const User = require('../models/user');

var updateMaxLevel = async (level, user) => {
   console.log(user)
   user[0].maxLevel = Math.max(level, user[0].maxLevel);
   await User.findByIdAndUpdate(user[0]._id, user[0]);
}

router.get('/1', isLoggedIn, async (req, res) => {
   res.render('All_Levels/level_1.ejs')
});
router.get('/2', isLoggedIn, async (req, res) => {
   let user = await User.find({ username: req.user.username });
   updateMaxLevel("1", user);
   res.render('All_Levels/level_2.ejs')
});
router.get('/3', isLoggedIn, async (req, res) => {
   let user = await User.find({ username: req.user.username });
   updateMaxLevel("2", user);
   res.render('All_Levels/level_3.ejs')
});
router.get('/4', isLoggedIn, async (req, res) => {
   let user = await User.find({ username: req.user.username });
   updateMaxLevel("3", user);
   res.render('All_Levels/level_4.ejs')
});
router.get('/5', isLoggedIn, async (req, res) => {
   let user = await User.find({ username: req.user.username });
   updateMaxLevel("4", user);
   res.render('All_Levels/level_5.ejs')
});
router.get('/6', isLoggedIn, async (req, res) => {
   let user = await User.find({ username: req.user.username });
   updateMaxLevel("5", user);
   res.render('All_Levels/level_6.ejs')
});
router.get('/7', isLoggedIn, async (req, res) => {
   let user = await User.find({ username: req.user.username });
   updateMaxLevel("6", user);
   res.render('All_Levels/level_7.ejs')
});
router.get('/8', isLoggedIn, async (req, res) => {
   let user = await User.find({ username: req.user.username });
   updateMaxLevel("7", user);
   res.render('All_Levels/level_8.ejs')
});
router.get('/9', isLoggedIn, async (req, res) => {
   let user = await User.find({ username: req.user.username });
   updateMaxLevel("8", user);
   res.render('All_Levels/level_9.ejs')
});
module.exports = router;

