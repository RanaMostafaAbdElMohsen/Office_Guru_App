var notification = require('../models/notification.js');
var dbManager=require('../database/dbManager.js');
var nodemailer = require('nodemailer');

notification.add=function(request,resp){
    var descr=request.body.descr;
    var id=request.body.id;
    var date=request.body.date;
    var username=request.body.username;
 

    var notification={
        descr:descr,
        id:id,
        date:date,
        username:username
    }
    
    var transporter = nodemailer.createTransport({  
        service:'Gmail',
        auth: {
          user: 'officegurusite@gmail.com',
          pass: 'officeguru2019'
        }
      }); 
      

      var mailOptions = {
        from: 'officegurusite@gmail.com' ,
        to: username,
        subject: 'Task Reminder',
        text: 'Hello there,  You have task: '+descr+'  due '+date+'... Thank you'
      };




      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
        
      }); 

    dbManager.addnotification(notification, function(req,res){
        if (req =="err")
            resp.send(res);
        else
            resp.send(res);
    })
}

notification.findall=function(request,resp){
    var username={ username: request.body.username };
    dbManager.findallnotification(username, function(req,res){
        if (req =="err")
            console.log("Error has occurred in database while finding task ");
        else{
            resp.send(res);
        }     
    })
}


module.exports = notification;