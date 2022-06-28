// New
const mongoose = require('mongoose');
const dbName = 'test';
const collectionName = 'beer';
const url = 'mongodb://Erick:password@localhost:27017/' + dbName;

var Schema = mongoose.Schema;

// Create schema
const BeerSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    style:{
        type: String,
        required: true,
    },
    ibu:{
        type: Number,
        required: true,
    },
    abv:{
        type: Number,
        required: true,
    },
    brewer:{
        type: String,
        required: true,
    },
    tags:{
        type: [String],
        index: true
    }
});

BeerSchema.index({style: 1, brewer: -1}); // schema level

// Instance methods
BeerSchema.methods.findSameBrewer = function(cb){
    return this.model(collectionName).find({brewer: this.brewer}, cb);
}

BeerSchema.methods.findSameTypes = function(cb){
    return this.model(collectionName).find({type: this.type}, cb);
}

BeerSchema.methods.findSameIBU = function(cb){
    return this.model(collectionName).find({ibu: this.ibu}, cb);
}

BeerSchema.methods.deleteSameBrewer = function(cb){
    return this.model(collectionName).deleteMany({brewer: this.brewer}, cb);
}

BeerSchema.statics.findAll = function(callback){
    return mongoose.model(collectionName).find({},
        function(err,result){
            if (err) throw err;
            callback(result);
        });
}

BeerSchema.methods.findByName = function(nameParameter, cb){
    return this.find({name: nameParameter}, cb);
}

BeerSchema.methods.findByStyle = function(styleParameter, cb){
    return this.find({style: styleParameter}, cb);
}

// Virtuals
BeerSchema.virtual('info.full').get(function(){
    return (this.name + ' is a/an ' + this.style + ', with ibu=' + this.ibu + " and abv=" + this.abv + 
    "%. The brewer is " + this.brewer + ". Some descriptive tags are " + this.tags);
});

const connector = async () => {
    const dbUri = url;
    try {
      mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
      console.log(`Succesfully connected to database: ${dbUri}`);
    } catch (error) {
      console.error(`Error connecting to database: ${error}`);
      process.exit(1);
    }
  };


//New
module.exports = {dbName,url,collectionName,BeerSchema, connector};