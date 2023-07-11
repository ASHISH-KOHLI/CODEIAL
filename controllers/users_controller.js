module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}


// render the sign up page

module.exports.signUp = function(req, res){
    return res.render('user_sign_up',{
        title:"Codeial | signUp"
    })
}



// render the sign in page

module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "codeial | Sign In"
    })
}

// get the sign up data

module.exports.create =function(req, res){
    // todo later
}


// get the sign in and create a session for the user
module.exports.createSession =function(req, res){
    // todo later
}