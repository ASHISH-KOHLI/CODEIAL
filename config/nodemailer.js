const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');


let transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smpt.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'codeial69',
        pass:'codeia@123'
    }
})


let renderTemplate = (data,relativePath) => {
    let maliHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailer',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('error in rendering template');
                return;
            }
            maliHTML = template;
        }
        )
        return maliHTML;
}


module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}