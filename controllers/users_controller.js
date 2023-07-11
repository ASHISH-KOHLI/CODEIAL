const User = require('../models/user')

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
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
      if(err){console.log('error in finding user in singing up'); return}  

      if (!user){
        User.create(req.body, function(err, user){
            if(err){console.log('error in creating  user while singing up'); return}  

            return res.redirect('/user/sign-in');
        })
      }else{
        return res.redirect('back');
      }

    });
}


// get the sign in and create a session for the user
module.exports.createSession =function(req, res){
    
    
//    steps to authnticate
    // find the user 
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in singing in'); return}  
        // handel user found
        if(user){
            // handle password which dont match
            if(user.password != req.body.password){
            return res.redirect('back');
                
            }
            // handle session creation
           
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
            

        }else{
            // handle user not found
            return res.redirect('back');
        }

    });





}