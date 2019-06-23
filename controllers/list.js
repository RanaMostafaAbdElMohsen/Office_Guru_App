var list = require('../models/ModelList.js');
var dbManager=require('../database/dbManager.js');

list.add=function(request,resp){
    var id =request.body.id;
    var title=request.body.title;
    var username=request.body.username;

    var list={
        title:title,
        id:id,
        username:username
     }

    dbManager.addlist(list, function(req,res){
        if (req=="err")
            console.log("Error has occurred in database while adding list ");
        else
            resp.send(res);
    })

}

list.modify=function(request,resp){
    var id =request.body.id;
    var title=request.body.title;
    var username=request.body.username;
    var list={
        title:title
    }
    var id={ id: id,username:username};
    dbManager.modifyList(id,{$set:list}, function(req,res){
        if (req =="err")
            console.log("Error has occurred in database while modifying list ");
        else
            resp.send(JSON.stringify(res));
    })
}

list.delete=function(request,resp){
    var id={ id: request.body.id, username:request.body.username};
    dbManager.deleteList(id, function(req,res){
        if (req =="err")
            console.log("Error has occurred in database while deleting list ");
        else
            resp.send(res);
    })
}

list.find=function(request,resp){
    var id={ username: request.query.username };
    dbManager.findalllists(id, function(req,res){
        if (req =="err")
            console.log("Error has occurred in database while findiing list ");
        else
            resp.send(res);
    })
}

module.exports = list;
