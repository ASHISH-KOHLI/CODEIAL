const User = require('../models/user');

// module.exports.actionName = function(req,res){}

module.exports.profile = function (req, res) {
    
                    return res.render('user_profile', {
                        title: "User Profile",
                    });
              
};


// render the sign up page
module.exports.SignUp = function (req, res) {
  if(req.isAuthenticated()){
   return  res.redirect('/users/profile');
  }


  return res.render("user_sign_up", {
    title: "Codeal|sign Up",
  });
};

// render the sign ip page
module.exports.SignIn = function (req, res) {
    if(req.isAuthenticated()){
       return  res.redirect('/users/profile');
      }

  return res.render("user_sign_in", {
    title: "Codeal|sign In",
  });
};

// get the sign up data
module.exports.create = function (req, res) {
    if (req.body.password !== req.body.confirm_password) {
        res.redirect('back');
    }

    const findUser = (query) => {
        return User.findOne(query).exec();
    };

    const createUser = (userData) => {
        return User.create(userData);
    };

    findUser({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return createUser(req.body);
            } else {
                return Promise.reject('User already exists');
            }
        })
        .then(() => {
            return res.redirect('/users/SignIn');
        })
        .catch((err) => {
            console.error('Error in creating user while signing up:', err);
            return res.status(500).send('Error creating user. Please try again later.');
        });
};




// //get the sign in and create the session for the user
// module.exports.createSession = function (req, res) {

//     const findUser = (query) => {
//         return User.findOne(query).exec();
//     }

//     findUser({email: req.body.email})
//         .then((user) => {

//             if(user){

//                     if(user.password != req.body.password){
//                         res.redirect('back');
//                 }
                
//                 //handle session creation
//                 res.cookie('user_id', user.id);
//                 res.redirect('/users/profile');;
            
//             }else{
//                 res.redirect('back');
//             }

//         }) 
//         .catch(err => {
//              console.log('error in finding user in signing in'); return 

//         })

// }}



 //get the sign in and create the session for the user
module.exports.createSession = function (req, res) {
    return res.redirect('/');
}