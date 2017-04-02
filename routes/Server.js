/**
 * Created by tiffanyraill on 2017-03-28.
 */
var express=require('express');
var nodemailer = require("nodemailer");
var router = express.Router();
/*
 Here we are configuring our SMTP Server details.
 SMTP is mail server which is responsible for sending and receiving email.
 */
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: 'tiffanytwheatley@gmail.com',
        pass: 'temppassword'
    }
});
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

router.get('/',function(req,res){
    res.sendfile('contactMe.ejs');
});
router.post('/send',function(req,res){
    console.log(req.body)
    var mailOptions={
        name: req.body.name,
        to: 'tiffanytwheatley@gmail.com',
        email: req.body.email,
        text: req.body.comments
    };
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.render('contactMe', {
                    message: 'Error - Email not sent'
                }
            );
        }else{
            console.log("Message sent: " + response.message);
            res.render('contactMe', {
                    message: 'Message Sent!'
                }
            );
        }
    });
});

module.exports = router;