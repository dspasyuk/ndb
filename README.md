
# NDB wrapper for NEDB: 
nedb: https://github.com/louischatriot/nedb



# Installation 

wget https://github.com/dspasyuk/ndb 

unzip ndb; cd ndb; npm install

Via NPM: 

npm install https://github.com/dspasyuk/ndb 

# Usage 

NDB contains the following functions which are similar to the mongodb api:
insertOne, insertMany, find, findOne, deleteOne, deleteMany, updateOne, updateMany

#### Loading the module
const ndb = require("ndb");
#### Initializing the module
var db = new ndb();

#### Insert one item into the collection
db.insertOne(collection, {x:i, y:i+i, z:i*i})
#### Insert multiple items in collection
db.insertMany(collection,  Array(5).fill({x:1, y:2, z:3}))
#### Find all items in the collection
db.find(collection, {})
#### Find one item in the collection
db.findOne(collection, {x:1, y:2, z:3})
#### Delete one item from the collection
db.deleteOne(collection, {x:1, y:2, z:3})
#### Delete many item in the collection
db.deleteMany(collection, {x:1, y:2, z:3})
#### Update one item in the collection
db.updateOne(collection, {x:1, y:2, z:3}, {x:4, y:5, z:6})
#### Update many item in the collection
db.updateMany(collection, {x:1, y:2, z:3}, {x:4, y:5, z:6})



## Examples

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
