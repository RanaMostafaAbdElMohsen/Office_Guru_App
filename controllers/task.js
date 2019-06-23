var task = require('../models/ModelTask.js');
var dbManager=require('../database/dbManager.js');

task.add=function(request,resp){
    //Tested
    var done=request.body.done;
    var descr=request.body.descr;
    var priority= request.body.priority;
    var listid=request.body.listid;
    var date=request.body.date;
    var id=request.body.id;
    var username=request.body.username;

    var task ={
        descr:descr,
        done: done,
        date :date,
        priority:priority,
        listid: listid,
        id: id,
        username:username
    }
    

    dbManager.addtask(task, function(req,res){
        if (req =="err")
            resp.send(res);
        else
            resp.send(res);
    })

}

task.modify=function(request,resp){
    
    var done=request.body.done;
    var descr=request.body.descr;
    var priority= request.body.priority;
    var listid=request.body.listid;
    var date=request.body.date;
    var id=request.body.id;
    var username=request.body.username;

    var task ={
        descr:descr,
        done: done,
        date :date,
        priority:priority,
        listid: listid,
        id: id,
        username:username
    }
    
    var id={ id: id, username:username};

    dbManager.modifytask(id,{$set:task}, function(req,res){
        if (req =="err")
            console.output("Error has occurred in database while modifying task ");
        else
            resp.send(res);
    });
}

task.delete=function(request,resp){
    
    var deleteid={ id: request.body.id,username:request.body.username};
    dbManager.deletetask(deleteid, function(req,res){
        if (req =="err")
            console.log("Error has occurred in database while deleting task ");
        else
            resp.send("Deletion Successful");
    })
}

task.deletebylist=function(request,resp){
    var deleteid={ listid: request.body.id,username:request.body.username};
    dbManager.deletetaskbylid(deleteid, function(req,res){
        if (req =="err")
            console.log("Error has occurred in database while deleting task ");
        else
            resp.send("Deletion Successful");
    })
}

task.find=function(request,resp){
    var id={ id: request.body.id};
    
    dbManager.findtask(id, function(req,res){
        if (req =="err")
            console.log("Error has occurred in database while finding task ");
        else{
            resp.send(res);
        }     
    })
}

task.findall=function(request,resp){
    var id={ username: request.query.username };
    dbManager.findalltask(id, function(req,res){
        if (req =="err")
            console.log("Error has occurred in database while finding task ");
        else{
            resp.send(res);
        }     
    })
}


module.exports = task;