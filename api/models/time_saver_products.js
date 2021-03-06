var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TimeSaverProductSchema = new Schema(
  {
    name: {type: String, required: true},
    cost: {type: Number, required: true},
    period: {type: String, required: true},
    time_save: {type: Number, required: true},
    time_unit: {type: String, required: true}
  },
  {collection: 'products'}
);

//Export model
module.exports = mongoose.model('TimeSaverProductSchema', TimeSaverProductSchema);