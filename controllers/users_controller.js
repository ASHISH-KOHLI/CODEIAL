const User = require('../models/user');

// module.exports.actionName = function(req,res){}


module.exports.profile = async function (req, res) {
    try {
        const user = await User.findById(req.params.id).exec();

        if (!user) {
            return res.redirect('/');
        }

        return res.render('user_profile', {
            title: 'Codeial | Profile',
            profile_user: user
        });
    } catch (err) {
        console.log('Error fetching user profile:', err);
        return res.redirect('/');
    }
};

module.exports.update = async function (req, res) {
    try {
        if (req.user.id == req.params.id) {
            await User.findByIdAndUpdate(req.params.id, req.body).exec();
            return res.redirect('back');
        } else {
            return res.status(401).send('Unauthorized');
        }
    } catch (err) {
        console.log('Error updating user:', err);
        return res.redirect('back');
    }
};


// render the sign up page
module.exports.SignUp = function (req, res) {
  if(req.isAuthenticated()){
   return  res.redirect('/users/profile'+ req.user.id);
  }


  return res.render("user_sign_up", {
    title: "Codeal|sign Up",
  });
};

// render the sign ip page
module.exports.SignIn = function (req, res) {
    if(req.isAuthenticated()){
       return  res.redirect('/users/profile' + req.user.id);
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
    req.flash('success','Logged in sucessfully');
    res.redirect('/');
}

// get the sign out functionality

module.exports.destroySession =function(req,res){
    req.logout();
    req.flash('success','You have logged out');

    return res.redirect('/')
}