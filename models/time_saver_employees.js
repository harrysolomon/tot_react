var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TimeSaverEmployeeSchema = new Schema(
  {
    name: {type: String, required: true},
    cost: {type: Number, required: true},
    period: {type: String, required: true},
  },
  {collection: 'employees'}
);

//Export model
module.exports = mongoose.model('TimeSaverEmployeeSchema', TimeSaverEmployeeSchema);