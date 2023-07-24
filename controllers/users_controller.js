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

module.exports.create = function (req, res) {};

//get the sign in and create the session for the user
module.exports.createSession = function (req, res) {};
