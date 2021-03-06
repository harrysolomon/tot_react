var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TimeSaverEmployeeSchema = new Schema(
  {
    name: {type: String},
    cost: {type: Number, required: true},
    period: {type: Number, required: true},
  },
  {collection: 'employees'}
);

//Export model
module.exports = mongoose.model('TimeSaverEmployeeSchema', TimeSaverEmployeeSchema);