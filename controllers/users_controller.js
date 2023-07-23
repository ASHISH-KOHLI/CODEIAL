// module.exports.actionName = function(req,res){}


module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title:'user_profile',
   });
}
