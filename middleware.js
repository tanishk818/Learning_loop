module.exports.isLoggedIn =(req,res,next)=>{
    req.session.returnTo=req.originalUrl;
    if(!req.isAuthenticated()){
        req.flash('error','you must be log in');
        return res.redirect('/login');
    }
    next()
};

module.exports.isAdmin =(req,res,next)=>{
    req.session.returnTo=req.originalUrl;
    if(!req.isAuthenticated()){
        req.flash('error','you must be log in as an admin to access the admin site');
        return res.redirect('/login');
    }
    next()
}