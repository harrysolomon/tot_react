var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TimeSaverProductSchema = new Schema(
  {
    name: {type: String, required: true},
    cost: {type: Number, required: true},
    description: {type: String},
    period: {type: String, required: true},
    time_save: {type: Number, required: true},
    time_unit: {type: String, required: true},
    createdAt: {type: Date, required: true},
    updatedAt: {type: Date, required: true},
    deleted: {type: Boolean, required: true}
  },
  //{ timestamps: true }, this is what I used to get the request to work, but let's change this once I add the ability to create products
  {collection: 'products'}
);

//Export model
module.exports = mongoose.model('TimeSaverProductSchema', TimeSaverProductSchema);