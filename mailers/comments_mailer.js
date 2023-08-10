const nodeMailer = require('../config/nodemailer');

//this is another way of exporting method
exports.newComment = (comment) =>{
    console.log('inside newCOMMENT MAILER');

    nodeMailer.transporter.sendMail({
        from:'kohli14ashish@gmail.com',
        to: comment.user.email,
        subject: "New comment published",
        html:'<h1> Yup, your comment is now publishec! </h1>'
    },(err,info) => {
        if(err){
            console.log('Error in Sending mail',err);
        return;
        }
            console.log('message sent',info);
    } )
}