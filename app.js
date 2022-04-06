const express = require('express');
const app=express()
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport=require('passport');
const LocalStrategy =require('passport-local');

const User=require('./models/user');
const home=require('./routes/home')
const lev=require('./routes/lev')


mongoose.connect('mongodb://localhost/auth_demo_app');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});




app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

const sessConfig={
    secret:'abetterone',
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7
    }
}
app.use(session(sessConfig));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    next();
})

app.use('/',home);
app.use('/lev',lev);


app.listen(3000, () => {
    console.log('Serving on port 3000')
})

