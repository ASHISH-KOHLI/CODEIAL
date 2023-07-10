module.exports.profile = function(req, res){
    res.end(`<h1>User Profile</h1>`);
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