
var express = require('express');
//var url =require('url');
var nodemailer = require("nodemailer");
var app=express();
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
// const gmailEmail = functions.config().gmail.email;
// const gmailPassword = functions.config().gmail.password;
const smtpTransport = nodemailer.createTransport({
service: 'gmail', 
 auth: {
  user: 'godarabhojraj71@gmail.com',
  pass: 'bhojrajbhojraj'
 }
});
var rand,mailOptions,host,link;
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

app.get('/',function(req, res){
    res.sendfile('index.html');
});
app.get('/send',function(req,res){
        rand=Math.floor((Math.random() * 100-1000) );  
    host=req.get('host');
   link="http://"+req.get('host')+"/verify?id="+rand;
    mailOptions={ 
        from : 'godarabhojraj71@gmail.com',
        to : req.query.to,
       subject : "Please confirm your Email account",
       html: "Hello,<br> <h4>Please Click on the link to verify your email.</h4><br><a href="+link+">Click here to verify</a><br> thank for using this Application!"
      
    }
    console.log(mailOptions);
    //return res.json(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
       //    return res.redirect('http://localhost:3000/send');
     if(error){ 
            console.log(error);
        res.end("error");
     }else{
               console.log("Message sent: " + response.message);
        res.end("sent");
         }    
});
});

app.get('/verify',function(req,res){
console.log(req.protocol+":/"+req.get('host'));
if((req.protocol+"://"+req.get('host'))==("http://"+host))
{
    console.log("Domain is matched. Information is from Authentic email");
    if(req.query.id==rand)
    {
        console.log("email is verified");
        res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
    }
    else
    {
        console.log("email is not verified");
        res.end("<h1>Bad Request</h1>");
    }
}
else
{
    res.end("<h1>Request is from unknown source");
}
});
    
/*--------------------Routing Over----------------------------*/

app.listen(3000,function(){
    console.log("Express Started on Port 3000");
});