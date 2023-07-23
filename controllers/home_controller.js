// a controller is a set of different actions

module.exports.home = function(req,res){
    return res.end('<h1>Express is uo for Codeal</h1>')
}

// module.exports.actionName = function(req,res){}