const User = require('../models/user');

// module.exports.actionName = function(req,res){}

module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "user_profile",
  });
};

// render the sign up page
module.exports.SignUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Codeal|sign Up",
  });
};

// render the sign ip page
module.exports.SignIn = function (req, res) {
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
//get the sign in and create the session for the user
module.exports.createSession = function (req, res) {};
