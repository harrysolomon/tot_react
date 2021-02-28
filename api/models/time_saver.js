var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TimeSaverSchema = new Schema(
  {
    name: {type: String, required: true},
    values: [{
      period: {type: String, required: true},
      value: {type: Number, required: true}
    }],
    inputs:[{
      cadences:{
        period:{type: String, required: true},
        name:{type: String, required: true}
      },
      current_time_spent:{type: Number, required: true},
    name: {type: String, required: true},
    employees:{
        cost:{type: Number, required: true},
        name:{type: String, required: true},
        period:{type: String, required: true}
    },
    products:{
        name:{type: String, required: true},
        cost: {type: Number, required: true},
        period: {type: String, required: true},
        time_save:{type: Number, required: true},
        time_unit:{type: String, required: true}   
    }
    }]
  },
  {collection: 'time_saver'}
);
        
module.exports = mongoose.model('TimeSaver', TimeSaverSchema);
