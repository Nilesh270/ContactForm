require('dotenv').config()
const express=require("express");
const bodyParser =require("body-parser");
const ejs = require("ejs");
const nodemailer = require("nodemailer");


const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs');



app.get("/",function(req,res){
    res.render("index")
});

app.post("/",function(req,res){

  let transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
      user: process.env.GMAIL, 
      pass: process.env.PASS
    },
  });
    
      var mailOptions = {
        from: process.env.GMAIL,
        to:req.body.Email ,
        subject: 'Form Response ',
        text: 'Hello '+req.body.Name+' Thank You for Filling Our Form.\nWe Will Get Back to you as soon as possible.\n\n\nWith regards\nSpell-Notion App.co'
      };
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      
      res.redirect("/");
})


app.listen(process.env.PORT || 3000 ,function(){
    console.log("Server is listening on port 3000");
});