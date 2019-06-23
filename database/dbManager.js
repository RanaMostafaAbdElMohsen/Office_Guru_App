
var mongoDB = require("mongodb");
var mongoClient = mongoDB.MongoClient;
var dbManager = {};



var db_url = 'mongodb://consultationproject:BilalandRana2019@ds115353.mlab.com:15353/office_guru';

var dbOptions = {
    useNewUrlParser: true,
    keepAlive: true,
    connectTimeoutMS: 30000,
    reconnectTries: 30,
    reconnectInterval: 5000
};

dbManager.addUser = function (user, cb) {
    mongoClient.connect(db_url, dbOptions, function (err, myDB) {
        if (err) cb(err, null);
        var dbo = myDB.db('office_guru');
        dbo.createCollection("users", function (err, res) {
            if (err) cb(err, null);
        });
        dbo.collection("users").insertOne(user, function (err, res) {
            if (err) cb(err, null);
            cb(null, res);
        });
    });
};

dbManager.upgradeUser = function (username, cb) {
    mongoClient.connect(db_url, dbOptions, function (err, myDB) {
        if (err) cb(err, null);
        var dbo = myDB.db('office_guru');
        dbo.createCollection("users", function (err, res) {
            if (err) cb(err, null);
        });
        var query = {
            username: username
        };
        var setter = {
            authority: 2
        };
        dbo.collection("users").updateOne(query, setter, function (err, res) {
            if (err) cb(err, null);
            else{
                cb(null, res);
            }
        });
    });
}

dbManager.downgradeUser = function (username, cb) {
    mongoClient.connect(db_url, dbOptions, function (err, myDB) {
        if (err) cb(err, null);
        var dbo = myDB.db('office_guru');
        dbo.createCollection("users", function (err, res) {
            if (err) cb(err, null);
        });
        var query = {
            username: username
        };
        var setter = {
            authority: 1
        };
        dbo.collection("users").updateOne(query, setter, function (err, res) {
            if (err) cb(err, null);
            else{
                cb(null, res);
            }
        });
    });
}

dbManager.changePassword = function (username, password, cb) {
    mongoClient.connect(db_url, dbOptions, function (err, myDB) {
        if (err) cb(err, null);
        var dbo = myDB.db('office_guru');
        dbo.createCollection("users", function (err, res) {
            if (err) cb(err, null);
        });
        var query = {
            username: username
        };
        var setter = {
            password: password
        };
        dbo.collection("users").updateOne(query, setter, function (err, res) {
            if (err) cb(err, null);
            else{
                cb(null, res);
            }
        });
    });
};

dbManager.findUserHash = function (username, cb) {
    mongoClient.connect(db_url, dbOptions, function (err, myDB) {
        if (err) cb(err, null);
        else{
            var dbo = myDB.db('office_guru');
            dbo.createCollection("users", function (err, res) {
                if (err) cb(err, null);
            });
            var query = {
                username: username
            };
            dbo.collection("users").findOne(query, function (err, res) {
                if (err) cb(err, null);
                else{
                    cb(null, res);
                }
            });
        }
        
    });
};

dbManager.addEvent = function (event, cb) {
    mongoClient.connect(db_url, dbOptions, function (err, myDB) {
        if (err) cb(err, null);
        var dbo = myDB.db('office_guru');
        dbo.createCollection("events", function (err, res) {
            if (err) cb(err, null);
        });
        dbo.collection("events").insertOne(event, function (err, res) {
            if (err) cb(err, null);
            cb(null, res);
        });
    });
};




dbManager.modifyEvent = function(id, newEvent, cb){
    mongoClient.connect(db_url, dbOptions, function (err, myDB) {
        if (err) cb(err, null);
        var dbo = myDB.db('office_guru');
        dbo.createCollection("events", function (err, res) {
            if (err) cb(err, null);
        });
        var query = {
            id: id
        };
        dbo.collection("events").updateOne(query, newEvent, function (err, res) {
            if (err) cb(err, null);
            else {
                cb(null, res);
            }
        });
    });
};

dbManager.deleteEvent = function(id, cb){
    mongoClient.connect(db_url, dbOptions, function (err, myDB) {
        if (err) cb(err, null);
        var dbo = myDB.db('office_guru');
        dbo.createCollection("events", function (err, res) {
            if (err) cb(err, null);
        });
        var query = {
            id: id
        };
        dbo.collection("events").deleteOne(query, function (err, res) {
            if (err) cb(err, null);
            else {
                cb(null, res);
            }
        });
    });
};

// Add List
dbManager.addlist = function (list, cb) {
    mongoClient.connect(db_url, dbOptions, function (err, myDB) {

        if (err) cb(err, null);
        if (myDB !=null)
        {
            console.log("DB not null");
            var dbo = myDB.db('office_guru');
            dbo.createCollection("lists", function (err, res) {
                if (err) cb(err, null);
            });
            dbo.collection("lists").insertOne(list, function (err, res) {
                if (err) { cb(err, null);
                    console.log(err);
                }
                else{
                cb(null,res);
                console.log("No error");
                }
            });
    }
    });
};

// Modify List
dbManager.modifyList= function(id, newList, cb){
    mongoClient.connect(db_url, dbOptions, function (err, myDB) {
        if (err) cb(err, null);
        var dbo = myDB.db('office_guru');
        dbo.createCollection("lists", function (err, res) {
            if (err) cb(err, null);
        });
        console.log(id)
        console.log(newList)
        dbo.collection("lists").updateOne(id, newList, function (err, res) {
            if (err) cb(err, null);
            else {
                cb(null, res);
            }
        });
    });
};

dbManager.deleteList = function(id, cb){
    mongoClient.connect(db_url, dbOptions, function (err, myDB) {
        if (err) cb(err, null);
        if (myDB !=null)
        {
            var dbo = myDB.db('office_guru');
            dbo.createCollection("lists", function (err, res) {
                if (err) cb(err, null);
            });
            dbo.collection("lists").deleteOne(id, function (err, res) {
                if (err) cb(err, null);
                else {
                    cb(null, res);
                }
            });
    }
    });
};

dbManager.findalllists = function (id, cb) {
    mongoClient.connect(db_url, dbOptions, function (err, myDB) {
        if (err) cb(err, null);
        var dbo = myDB.db('office_guru');
        dbo.createCollection("lists", function (err, res) {
            if (err) cb(err, null);
        });
        dbo.collection("lists").find(id).toArray(function (err, res) {
            if (err) cb(err, null);
            cb(null, res);
        });
    });
};



// Add task
dbManager.addtask = function (task, cb) {
    mongoClient.connect(db_url, dbOptions, function (err, myDB) {
        if (err) cb(err, null);
        if (myDB !=null)
        {
            var dbo = myDB.db('office_guru');
            dbo.createCollection("tasks", function (err, res) {
                if (err) cb(err, null);
            });
            dbo.collection("tasks").insertOne(task, function (err, res) {
                if (err) cb(err, null);
                else
                    cb(null, res);
            });
        }
    });
};

// Modify task
dbManager.modifytask = function (id,task, cb) {
    mongoClient.connect(db_url, dbOptions, function (err, myDB) {
        if (err) cb(err, null);
        var dbo = myDB.db('office_guru');
        dbo.createCollection("tasks", function (err, res) {
            if (err) cb(err, null);
        });
        dbo.collection("tasks").updateOne(id,task, function (err, res) {
            if (err) cb(err, null);
            cb(null, res);
        });
    });
};

// Delete task
dbManager.deletetask = function (id, cb) {
    mongoClient.connect(db_url, dbOptions, function (err, myDB) {
        if (err) cb(err, null);
        var dbo = myDB.db('office_guru');
        dbo.createCollection("tasks", function (err, res) {
            if (err) cb(err, null);
        });
        
        dbo.collection("tasks").deleteOne(id, function (err, res) {
            if (err) cb(err, null);
            cb(null, res);
        });
    });
};

dbManager.deletetaskbylid = function (id, cb) {
    mongoClient.connect(db_url, dbOptions, function (err, myDB) {
        if (err) cb(err, null);
        var dbo = myDB.db('office_guru');
        dbo.createCollection("tasks", function (err, res) {
            if (err) cb(err, null);
        });
        
        dbo.collection("tasks").deleteMany(id, function (err, res) {
            if (err) cb(err, null);
            cb(null, res);
        });
    });
};


// Find task
dbManager.findtask = function (id, cb) {
    mongoClient.connect(db_url, dbOptions, function (err, myDB) {
        if (err) cb(err, null);
        var dbo = myDB.db('office_guru');
        dbo.createCollection("tasks", function (err, res) {
            if (err) cb(err, null);
        });
        dbo.collection("tasks").findOne(id, function (err, res) {
            if (err) cb(err, null);
            cb(null, res);
        });
    });
};


dbManager.findalltask = function (id,cb) {
    mongoClient.connect(db_url, dbOptions, function (err, myDB) {
        if (err) cb(err, null);
        var dbo = myDB.db('office_guru');
        dbo.createCollection("tasks", function (err, res) {
            if (err) cb(err, null);
        });
        dbo.collection("tasks").find(id).toArray(function (err, res) {
            console.log(res);
            if (err) cb(err, null);
            cb(null, res);
        });
    });
};


dbManager.findallnotification = function (username,cb) {
    mongoClient.connect(db_url, dbOptions, function (err, myDB) {
        if (err) cb(err, null);
        var dbo = myDB.db('office_guru');
        dbo.createCollection("notifications", function (err, res) {
            if (err) cb(err, null);
        });
        dbo.collection("notifications").find(username).toArray(function (err, res) {
            console.log(res);
            if (err) cb(err, null);
            cb(null, res);
        });
    });
};

dbManager.addnotification = function (notifications,cb) {
    mongoClient.connect(db_url, dbOptions, function (err, myDB) {
        if (err) cb(err, null);
        if (myDB !=null)
        {
            var dbo = myDB.db('office_guru');
            dbo.createCollection("notifications", function (err, res) {
                if (err) cb(err, null);
            });
            dbo.collection("notifications").insertOne(notifications, function (err, res) {
                if (err) cb(err, null);
                else
                cb(null, res);
            });
        }
    });
};

module.exports = dbManager;