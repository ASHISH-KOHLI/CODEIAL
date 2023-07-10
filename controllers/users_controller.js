module.exports.profile = function(req, res){
    res.end(`<h1>User Profile</h1>`);
}

module.exports.signUp = function(req, res){
    return res.render('user_sign_up',{
        title:"Codeial | signUp"
    })
}