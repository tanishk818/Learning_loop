const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const { isAdmin, isLoggedIn } = require('../middleware');
const { userSchema } = require('../Schema.js');
const nodemailer = require("nodemailer");
const { encrypt, decrypt } = require('../crypto');

async function sEmail(email, username) {
   const d = new Date();
   console.log(d);
   var str = email + "@#$" + d + "@#$" + username;
   var tab = encrypt(Buffer.from(str, 'utf8'));
   console.log(tab)
   var link = "http://localhost:3000/resetPassword/" + tab.iv + "/" + tab.content;
   console.log();
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
      subject: 'Invoices due',
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
const validate = (req, res, next) => {
   const { error } = userSchema.validate(req.body);
   console.log(error)
   if (error) {
      req.flash('error', error.details.map(el => el.message).join(','));
      res.redirect('/login')
   } else {
      next();
   }
}

router.get("/", (req, res) => {
   res.render('index.ejs')
})

router.get("/levels", isLoggedIn, (req, res) => {
   let data = [
      {
         image: 'basic_constructs.jpeg',
         name: 'level 1',
         url: '/lev/1',
         description: 'pehli level hai'
      },
      {
         image: 'basic_constructs.jpeg',
         name: 'level 2',
         url: '/lev/2',
         description: 'doosri level hai'
      },
      {
         image: 'basic_constructs.jpeg',
         name: 'level 1',
         url: '/lev/3',
         description: 'pehli level hai'
      },
      {
         image: 'basic_constructs.jpeg',
         name: 'level 2',
         url: '/lev/4',
         description: 'doosri level hai'
      },
      {
         image: 'basic_constructs.jpeg',
         name: 'level 2',
         url: '/lev/5',
         description: 'doosri level hai'
      },
      {
         image: 'basic_constructs.jpeg',
         name: 'level 1',
         url: '/lev/6',
         description: 'pehli level hai'
      },
      {
         image: 'basic_constructs.jpeg',
         name: 'level 2',
         url: '/lev/7',
         description: 'doosri level hai'
      },
      {
         image: 'basic_constructs.jpeg',
         name: 'level 1',
         url: '/lev/8',
         description: 'pehli level hai'
      },
      {
         image: 'basic_constructs.jpeg',
         name: 'level 2',
         url: '/lev/9',
         description: 'doosri level hai'
      },
   ]
   res.render('lev.ejs', { levelData: data })
})

router.get("/help", (req, res) => {
   res.render('contact.ejs')
})

router.get("/admin", isAdmin, async (req, res) => {
   let noOfLevels = 5;
   let users = await User.find({});

   if (req.user.username === "admin")
      res.render("admin.ejs", { users, noOfLevels });
   else {
      req.flash('error', 'you must be log in as an admin to access the admin site');
      res.redirect('/levels');
   }
})

router.get('/login', (req, res) => {
   if (!req.isAuthenticated())
      res.render('login.ejs')
   else
      res.redirect('/levels')
})


router.post('/Signup', validate, async (req, res, next) => {
   let oldUser = await User.findOne({ email: req.body.email });
   console.log(oldUser);
   if (oldUser) {
      req.flash('error', 'User already exist')
      res.redirect('/login')
   } else {
      // Insert the new user if they do not exist yet
      let maxLevel = "0"
      try {

         const { username, email, password } = req.body;
         const user = new User({ email, maxLevel, username });
         const registeredUser = await User.register(user, password);
         req.login(registeredUser, err => {

            if (err) return next(err);
            console.log(req.registeredUser);
            req.flash('success', 'welcome to Learning Loop');
            res.redirect('/lev/1');

         })
      }
      catch (e) {
         req.flash('error', e.message);
         res.redirect('login');
      }
   }

})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
   req.flash('success', 'welcome back!' + req.user.username);
   var redirectUrl;
   if (req.user.username == "admin")
      redirectUrl = '/admin';
   else
      redirectUrl = '/levels';
   delete req.session.returnTo;
   res.redirect(redirectUrl);
})

router.post('/reset', async (req, res) => {
   let oldUser = await User.findOne({ email: req.body.email });
   console.log(oldUser);
   if (oldUser) {
      console.log(req.user);
      sEmail(req.body.email, oldUser.username);
      req.flash('success', 'reset Link set')
      res.redirect('/login')
   }
   else {
      req.flash('error', 'you are not registered yet')
      res.redirect('/login');
   }
})
router.get('/logout', (req, res) => {
   req.logOut();
   req.flash('success', 'successfully logout');
   res.redirect('/login');
})

router.post('/resetPassword/:iv/:encryptedData', async (req, res) => {
   var text = {
      iv: req.params.iv,
      content: req.params.encryptedData
   }
   var str = decrypt(text);
   var email = str.split("@#$")[0];
   var username = str.split("@#$")[2]
   let user = await User.findOne({ email: email });
   console.log(user);
   user.setPassword(req.body.password, (err, user) => {
      user.save()
      console.log(user)
   });
   req.flash('success', 'Password reset successfully')
   res.redirect('/login')
})

router.get('/resetPassword/:iv/:encryptedData', async (req, res) => {
   console.log(req.params.encryptedData)

   var text = {
      iv: req.params.iv,
      content: req.params.encryptedData
   }

   var str = decrypt(text);
   var email = str.split("@#$")[0];
   var time = (str.split("@#$")[1]);
   var username = str.split("@#$")[2];
   const d = new Date();
   console.log(d)
   console.log(time)
   console.log(d.getTime())
   console.log(d.getTime() - Date.parse(time))
   console.log(Math.round(((d.getTime() - Date.parse(time)) / 1000) / 60));
   if (Math.round(((d.getTime() - Date.parse(time)) / 1000) / 60) < 10)
      res.render('forgotPass.ejs', { username, email, text });
   else {
      req.flash('error', 'Rest link expired');
      res.redirect('/login')
   }


})



router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
   req.flash('success', 'welcome back!' + req.user.username);
   var redirectUrl;
   if (req.user.username == "admin")
      redirectUrl = '/admin';
   else
      redirectUrl = '/lev/1';
   delete req.session.returnTo;
   res.redirect(redirectUrl);
})

router.get('/logout', (req, res) => {
   req.logOut();
   req.flash('success', 'successfully logout');
   res.redirect('/login');
})

router.post('/changepassword', (req, res) => {
   let user = req.user;
   user.setPassword(req.body.password, (err, user) => {
      user.save()
      console.log(user)
   });
   req.flash('success', 'Password reset successfully')
   res.redirect('/login')
})

router.get('/changepassword', (req, res) => {
   if (!req.isAuthenticated()) {
      req.flash("error", "You must be log in first")
      res.redirect('/login')
   }
   else
      res.render('changePass.ejs')
})
router.get('/about', (req, res) => {
   if (!req.isAuthenticated()) {
      req.flash("error", "You must be log in first")
      res.redirect('/login')
   }
   else
      res.render('about.ejs')
})
router.get('/feedback', (req, res) => {
   if (!req.isAuthenticated()) {
      req.flash("error", "You must be log in first")
      res.redirect('/login')
   }
   else
      res.render('feedback.ejs')
})
router.get('/howtoplay', (req, res) => {
   if (!req.isAuthenticated()) {
      req.flash("error", "You must be log in first")
      res.redirect('/login')
   }
   else
      res.render('howToPlay.ejs')
})

module.exports = router;