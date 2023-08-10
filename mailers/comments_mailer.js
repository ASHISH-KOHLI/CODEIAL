const nodeMailer = require('../config/nodemailer');

//this is another way of exporting method
exports.newComment = (comment) =>{
   let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from:'kohli14ashish@gmail.com',
        to: comment.user.email,
        subject: "New comment published",
        html:htmlString
    },(err,info) => {
        if(err){
            console.log('Error in Sending mail',err);
        return;
        }
            console.log('message sent',info);
    } )
}