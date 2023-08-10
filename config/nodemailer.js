const nodemailer = require("nodemailer");
const ejs = reqiure("ejs");


let transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smpt.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'alchemy.cn18',
        pass:'coadingninja'
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