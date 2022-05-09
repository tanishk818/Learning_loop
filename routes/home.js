const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Faq = require('../models/faq');
const Feedback = require('../models/feedback');

const passport = require('passport');
const { encrypt, decrypt } = require('../crypto');
const nodemailer = require("nodemailer");

const { isAdmin, isLoggedIn } = require('../middleware');
const levelData = require('./levelData')
const { userSchema } = require('../Schema.js');

async function sEmail(email, username, resetLinkCount) {
   const d = new Date();
   var str = email + "@#$" + d + "@#$" + username + "@#$" + resetLinkCount;
   var tab = encrypt(Buffer.from(str, 'utf8'));
   var link = "http://learning-loop-game.herokuapp.com/resetPassword/" + tab.iv + "/" + tab.content;
   const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: 'info.learningloop@gmail.com',
         pass: 'Learn@123' // naturally, replace both with your real credentials or an application-specific password
      }
   });

   const mailOptions = {
      from: 'info.learningloop@gmail.com',
      to: email,
      subject: 'Password Reset',
      html: '<p>Click <a href="' + link + '">here</a> to reset your password</p>'
   };

   transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
         console.log(error);
      } else {
         console.log('Email sent: ' + info.response);
      }
   });

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

      transport.sendMail(mailOptions, function (err, info) {
         transport.close();
         if (err) {
            callback(err, info);
         }
         else {
            callback(null, info);
         }
      });
   }

}

router.get("/", (req, res) => {
   res.render('index.ejs')
})

router.get("/levels", isLoggedIn, (req, res) => {
   res.render('lev.ejs', { levelData })
})

router.get("/admin", isAdmin, async (req, res) => {
   let noOfLevels = 9;
   let users = await User.find({});
   let feedbacks = await Feedback.find({})

   if (req.user.isAdmin)
      res.render("admin.ejs", { users, noOfLevels, feedbacks });
   else {
      req.flash('error', 'You must be logged in as an admin to access the admin site');
      res.redirect('/levels');
   }
})
router.get("/admin/feedbacks", isAdmin, async (req, res) => {
   let feedbacks = await Feedback.find({})

   if (req.user.isAdmin)
      res.render("adminFeedbacks.ejs", { feedbacks });
   else {
      req.flash('error', 'You must be logged in as an admin to access the admin site');
      res.redirect('/levels');
   }
})
router.get("/admin/faqs", isAdmin, async (req, res) => {
   let faqs = await Faq.find({})
   if (req.user.isAdmin)
      res.render("adminFAQs.ejs", { faqs });
   else {
      req.flash('error', 'You must be logged in as an admin to access the admin site');
      res.redirect('/levels');
   }
})
router.post("/admin/faqs", isAdmin, async (req, res) => {
   try {
      let data = { ...req.body, createdOn: new Date() }
      let faq = new Faq({ ...data })
      await faq.save()
      res.redirect('/admin/faqs')
   } catch (e) {
      req.flash('error', e.message);
      res.redirect('/login');
   }
})

router.get('/login', (req, res) => {
   if (!req.isAuthenticated())
      res.render('login.ejs')
   else
      res.redirect('/levels')
})


router.post('/Signup', async (req, res, next) => {

   // Insert the new user if they do not exist yet
   let maxLevel = "0"
   try {

      const { username, name, password } = req.body;
      const user = new User({ name, maxLevel, username });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, err => {

         if (err) return next(err);
         req.flash('success', 'Welcome to Learning Loop');
         res.redirect('/levels');

      })
   }
   catch (e) {
      if (e.message == "A user with the given username is already registered") {
         e.message = " User with that Email already exists "
      }
      req.flash('error', e.message);
      res.redirect('login');
   }


})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/loginFailure' }), (req, res) => {
   req.flash('success', 'Welcome! ' + req.user.name);
   var redirectUrl;
   if (req.user.isAdmin)
      redirectUrl = '/admin';
   else
      redirectUrl = '/levels';
   delete req.session.returnTo;
   res.redirect(redirectUrl);
})

router.post('/reset', async (req, res) => {
   let oldUser = await User.findOne({ username: req.body.email });
   if (oldUser) {
      sEmail(req.body.email, oldUser.name, oldUser.resetLinkCount);
      req.flash('success', 'Reset Link Sent')
      res.redirect('/login')
   }
   else {
      req.flash('error', 'You are not registered yet')
      res.redirect('/login');
   }
})
router.get('/logout', (req, res) => {
   req.logOut();
   req.flash('success', 'Successfully logout');
   res.redirect('/login');
})

router.post('/resetPassword/:iv/:encryptedData', async (req, res) => {
   var text = {
      iv: req.params.iv,
      content: req.params.encryptedData
   }
   var str = decrypt(text);
   var email = str.split("@#$")[0];
   let user = await User.findOne({ username: email });
   user.resetLinkCount++
   user.setPassword(req.body.password, (err, user) => {
      user.save()
   });
   req.flash('success', 'Password reset successfully')
   res.redirect('/login')
})

router.get('/resetPassword/:iv/:encryptedData', async (req, res) => {
   var text = {
      iv: req.params.iv,
      content: req.params.encryptedData
   }

   var str = decrypt(text);
   var email = str.split("@#$")[0];
   var time = (str.split("@#$")[1]);
   var username = str.split("@#$")[2];
   var resetLinkCount = str.split("@#$")[3];
   let user = await User.findOne({ username: email });
   if (parseInt(user.resetLinkCount) !== parseInt(resetLinkCount)) {
      req.flash('error', 'Reset Link Expired')
      res.redirect('/login')
   }
   else {
      const d = new Date();
      if (Math.round(((d.getTime() - Date.parse(time)) / 1000) / 60) < 10)
         res.render('forgotPass.ejs', { username, email, text });
      else {
         req.flash('error', 'Rest link expired');
         res.redirect('/login')
      }
   }
})


router.get('/loginFailure', (req, res) => {
   req.flash("error", "Email or password is incorrect");
   res.redirect('/login')
})

router.get('/logout', (req, res) => {
   req.logOut();
   req.flash('success', 'Successfully logout');
   res.redirect('/login');
})

router.post('/changepassword', (req, res) => {
   let user = req.user;
   user.setPassword(req.body.password, (err, user) => {
      user.save()
   });
   req.flash('success', 'Password reset successfully')
   res.redirect('/login')
})

router.get('/changepassword', (req, res) => {
   if (!req.isAuthenticated()) {
      req.flash("error", "You must log in first")
      res.redirect('/login')
   }
   else
      res.render('changePass.ejs')
})
router.get('/about', (req, res) => {
   if (!req.isAuthenticated()) {
      req.flash("error", "You must log in first")
      res.redirect('/login')
   }
   else
      res.render('about.ejs')
})
router.get('/feedback', (req, res) => {
   if (!req.isAuthenticated()) {
      req.flash("error", "You must log in first")
      res.redirect('/login')
   }
   else
      res.render('feedback.ejs')
})
router.post('/feedback', async (req, res) => {
   try {
      let data = { ...req.body, username: req.user.username, createdOn: new Date() }
      let feedback = new Feedback({ ...data })
      await feedback.save()
      req.flash("success", "Feedback sent successfully")
      res.redirect('/levels')
   } catch (e) {
      req.flash('error', e.message);
      res.redirect('/login');
   }
})
router.get('/howtoplay', (req, res) => {
   if (!req.isAuthenticated()) {
      req.flash("error", "You must log in first")
      res.redirect('/login')
   }
   else
      res.render('howtoplay.ejs')
})

router.get("/faq", async (req, res) => {
   let faqs = await Faq.find({})
   if (!req.isAuthenticated()) {
      req.flash("error", "You must log in first")
      res.redirect('/login')
   }
   else
      res.render('faq.ejs', { faqs })
})

module.exports = router;