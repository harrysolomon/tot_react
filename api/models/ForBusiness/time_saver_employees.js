var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TimeSaverEmployeeSchema = new Schema(
  {
    name: {type: String, required: true},
    cost: {type: Number, required: true},
    department: {type: String, required: true},
    period: {type: String, required: true},
    deleted: {type: Boolean, required: true}
  },
  //{ timestamps: true }, this is what I used to get the request to work, but let's change this once I add the ability to create employees
  {collection: 'employees'}
);

//Export model
module.exports = mongoose.model('TimeSaverEmployeeSchema', TimeSaverEmployeeSchema);