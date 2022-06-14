
# NDB wrapper for NEDB: 
nedb: https://github.com/louischatriot/nedb



# Installation 

wget https://github.com/deonis1/ndb 

unzip ndb

cd ndb

npm install

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
#### Find all items in the collection
db.find(collection, {x:1, y:2, z:3})
#### Update one item in the collection
db.updateOne(collection, {x:1, y:2, z:3}, {x:4, y:5, z:6})
#### Find all items in the collection
db.find(collection, {x:4, y:5, z:6})