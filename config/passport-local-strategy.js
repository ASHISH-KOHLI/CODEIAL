const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User =require('../models/user');

// // authentication using passport
// passport.use(new LocalStrategy({
//     usernameField:'email'
// },
// function(email,password,done){
// // find a user and establish the identity
//   User.findOne({email},function(err,user){
//     if (err) {
//         console.log('Error in finding user --> passport');
//          return done(err);
//         }
//     if (!user || user.password != password) { 
//         console.log('Invalid username/Password')
//         return done(null, false);
//      }
  
//     return done(null, user);
//   });
// }
// ))

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async function(email, password, done) {
    try {
        // find a user and establish the identity
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            console.log('Invalid username/Password');
            return done(null, false);
        }

        return done(null, user);
    } catch (err) {
        console.log('Error in finding user --> passport');
        return done(err);
    }
}));





// serializing the user to decide which key is to be kept in the cookies

passport.serializeUser(function(user,done){
    done (null,user.id);
});


// deserialize the user from the kry in the cookies

passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findById(id);
        return done(null, user);
    } catch (err) {
        console.log('Error in finding user --> passport');
        return done(err);
    }

});


// check if the user is authenticated

passport.checkAuthentication = function(req,res,next){
    // if the user is signed in, then passed on the request to the next functiion(controller action)
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in

    return res.redirect('/users/SignIn');
}

passport.setAuthenticatedUser = function (req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the sessions cookies and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}




module.exports=passport;