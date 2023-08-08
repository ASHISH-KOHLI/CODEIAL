const User = require('../../../models/user');
const jwt = require('jsonwebtoken');


module.exports.createSession = async function (req, res) {
    try {
    let user = await User.findOne({email: req.body.email});
       
    if(!user || user.password != req.body.password){
        return res.json(422,{
            message: 'Invalid user name ',

        })
    }
             
    return res.json(200,{
        message: 'siign in sucessful here is your token,please leep it safe ',
        data: {
            token: jwt.sign(user.toJSON(),'codeial',{expiresIn: '1000'})
        }
     })

    }
    catch (err) {
        console.log('Error:', err);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
  };