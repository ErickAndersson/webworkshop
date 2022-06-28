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

BeerSchema.statics.findByStyle = function(styleParameter, cb){
    return this.find({style: styleParameter}, cb);
}

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

module.exports = {dbName,url,collectionName,BeerSchema, connector};