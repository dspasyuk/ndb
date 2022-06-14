// MIT Licence, https://opensource.org/licenses/MIT
// Copyright (c) Denis Spasyuk, 2022, version 1.0.0

// import netb from "./netb.js";
var Datastore = require('nedb');
const path = require('path');

// init constructor function
function ndb() {
    this.db = {};
    this.start_date = new Date(Date.now() - ( 3600 * 1000 * 24*365*3));
} 

//init collection
ndb.prototype.collection =  function(collection, dbpath = "db"){
    if (this.db.collection){
        return this.db.collection;
    }else{
        this.db.collection={};
        this.db.collection = new Datastore({filename: path.join(dbpath, collection+".db"), timestampData:false});
        this.db.collection.loadDatabase();
        return this.db.collection;
    }
}

// handle errors
ndb.prototype.handle_errors = function(err, msg){
        if (err) throw err;
        if (err){
           console.log(msg, err);
        }
}

// generic insert function
ndb.prototype.insert = async function(collection, obj){
    var self = this;
    const msg = "Inserted";
    this.db.collection = this.collection(collection);
    this.db.collection.insert(obj, (err)=> { self.handle_errors(err, msg)});
}

// insert one item
ndb.prototype.insertOne = async function(collection, obj){
    await this.insert(collection, obj);
}

//insert many items
ndb.prototype.insertMany = async function(collection, obj){
   await this.insert(collection, obj);
}
// generic update function
ndb.prototype.update = async function(collection, target, newitem, multi){
    var self = this;
    const msg = "Inserted";
    this.db.collection = this.collection(collection);
    this.db.collection.update(target, { $set: newitem }, { upsert: true, multi: multi }, (err)=> { self.handle_errors(err, msg)});
}
// update many items
ndb.prototype.updateMany = async function(collection, target, newitem){
   await this.update(collection, target, newitem, true);
}
// update one item
ndb.prototype.updateOne = async function(collection, target, newitem){
   await this.update(collection, target, newitem, false);
}
// find all items
ndb.prototype.find = async function(collection, queryobj){
    var self = this;
    this.db.collection = this.collection(collection);
    return new Promise(function(resolve, reject) {
        self.db.collection.find(queryobj, function(err, docs) {
            if (err) {
              return reject(err)
            }
              return resolve(docs)
          })
      }); 
}
// find one item
ndb.prototype.findOne = async function(collection, queryobj){
    var self = this;
    this.db.collection = this.collection(collection);
    return new Promise(function(resolve, reject) {
        self.db.collection.findOne(queryobj, function(err, docs) {
            if (err) {
              return reject(err)
            }
              return resolve(docs)
          })
      }); 
}
// generic remove function
ndb.prototype.remove = async function(collection, target, multi){
    var self = this;
    const msg = "Inserted";
    this.db.collection = this.collection(collection);
    this.db.collection.remove(target, {multi: multi }, (err)=> { self.handle_errors(err, msg)});
}
// delete many items
ndb.prototype.deleteMany = async function(collection, target){
    await this.remove(collection, target, true);
}
// delete one item
ndb.prototype.deleteOne = async function(collection, target){
    await this.remove(collection, target, false);
}

// get latest date from collection of timeseries data
ndb.prototype.get_lattest_date = async function(arr){
    var max = null;
    if (arr.length>0){
       return arr.reduce((a, b) => {
       return new Date(a.date) > new Date(b.date) ? a : b;
    })
    }else {
        var d = {};
        d["date"] =  this.start_date;
        return d;
    }
}

module.exports = ndb;

// test the module
async function test(){
    var db = new ndb();
    const collection = "testrun"+Math.random().toString();
    console.log("insertOne 20 times");
    for (let i = 0; i <20; i++){
        db.insertOne(collection, {x:i, y:i+i, z:i*i})
    }
    console.log("insertMany [5X{x:1, y:2, z:3}]");
    db.insertMany(collection,  Array(5).fill({x:1, y:2, z:3}));

    console.log("find all");
    console.log(await db.find(collection, {}));   

    console.log("Find one {x:1, y:2, z:3}");
    console.log(await db.findOne(collection, {x:1, y:2, z:3}));

    console.log("deleteOne {x:1, y:2, z:3}");
    db.deleteOne(collection, {x:1, y:2, z:3});

    console.log("Find 4 items remaining {x:1, y:2, z:3}");
    console.log(await db.find(collection, {x:1, y:2, z:3}));

    console.log("updateOne item {x:1, y:2, z:3} to {x:4, y:5, z:6}");   
    db.updateOne(collection, {x:1, y:2, z:3}, {x:4, y:5, z:6});

    console.log("Find updated item  {x:4, y:5, z:6}");
    console.log(await db.find(collection,  {x:4, y:5, z:6}));
}

