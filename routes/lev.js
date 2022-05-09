const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const User = require('../models/user');

var updateMaxLevel = async (level, user) => {
   user[0].maxLevel = Math.max(level, user[0].maxLevel);
   await User.findByIdAndUpdate(user[0]._id, user[0]);
}


router.get('/updatelevel', isLoggedIn, async (req, res) => {
   let user = await User.find({ username: req.user.username });
   updateMaxLevel(req.query.level, user);

   res.redirect(`/lev/${parseInt(req.query.level) + 1}`)
})

router.get('/1', isLoggedIn, async (req, res) => {
   res.render('All_Levels/level_1.ejs')
});
router.get('/2', isLoggedIn, async (req, res) => {
   if (req.user.maxLevel + 1 < 2) {
      req.flash('error', 'This level is locked')
      res.redirect('/levels')
   }
   else
      res.render('All_Levels/level_2.ejs')
});
router.get('/3', isLoggedIn, async (req, res) => {
   if (req.user.maxLevel + 1 < 3) {
      req.flash('error', 'This level is locked')
      res.redirect('/levels')
   }
   else
      res.render('All_Levels/level_3.ejs')
});
router.get('/4', isLoggedIn, async (req, res) => {
   if (req.user.maxLevel + 1 < 4) {
      req.flash('error', 'This level is locked')
      res.redirect('/levels')
   }
   else
      res.render('All_Levels/level_4.ejs')
});
router.get('/5', isLoggedIn, async (req, res) => {
   if (req.user.maxLevel + 1 < 5) {
      req.flash('error', 'This level is locked')
      res.redirect('/levels')
   }
   else
      res.render('All_Levels/level_5.ejs')
});
router.get('/6', isLoggedIn, async (req, res) => {
   if (req.user.maxLevel + 1 < 6) {
      req.flash('error', 'This level is locked')
      res.redirect('/levels')
   }
   else
      res.render('All_Levels/level_6.ejs')
});
router.get('/7', isLoggedIn, async (req, res) => {
   if (req.user.maxLevel + 1 < 7) {
      req.flash('error', 'This level is locked')
      res.redirect('/levels')
   }
   else
      res.render('All_Levels/level_7.ejs')
});
router.get('/8', isLoggedIn, async (req, res) => {
   if (req.user.maxLevel + 1 < 8) {
      req.flash('error', 'This level is locked')
      res.redirect('/levels')
   }
   else
      res.render('All_Levels/level_8.ejs')
});
router.get('/9', isLoggedIn, async (req, res) => {
   if (req.user.maxLevel + 1 < 9) {
      req.flash('error', 'This level is locked')
      res.redirect('/levels')
   }
   else
      res.render('All_Levels/level_9.ejs')
});
router.get('/10', isLoggedIn, async (req, res) => {
   if (req.user.maxLevel + 1 < 10) {
      req.flash('error', 'This level is locked')
      res.redirect('/levels')
   }
   else
      res.render('All_Levels/level_10.ejs')
});
router.get('/11', isLoggedIn, async (req, res) => {
   if (req.user.maxLevel + 1 < 11) {
      req.flash('error', 'This level is locked')
      res.redirect('/levels')
   }
   else
      res.render('All_Levels/level_11.ejs')
});
router.get('/12', isLoggedIn, async (req, res) => {
   if (req.user.maxLevel + 1 < 12) {
      req.flash('error', 'This level is locked')
      res.redirect('/levels')
   }
   else
      res.render('All_Levels/level_12.ejs')
});
router.get('/13', isLoggedIn, async (req, res) => {
   if (req.user.maxLevel + 1 < 13) {
      req.flash('error', 'This level is locked')
      res.redirect('/levels')
   }
   else {
      req.flash('success', 'Thanks for Playing! More Levels coming soon.')
      res.redirect('/levels')
   }
});
module.exports = router;

