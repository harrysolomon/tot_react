var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TimeSaverProductSchema = new Schema(
  {
    name: {type: String},
    cost: {type: Number, required: true},
    period: {type: Number, required: true},
    time_save: {type: Number, required: true},
    time_unit: {type: Number, required: true}
  },
  {collection: 'products'}
);

//Export model
module.exports = mongoose.model('TimeSaverProductSchema', TimeSaverProductSchema);