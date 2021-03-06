var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CadenceSchema = new Schema(
  {
    name: {type: String},
    period: {type: Number, required: true}
  },
  {collection: 'cadences'}
);

//Export model
module.exports = mongoose.model('CadenceSchema', CadenceSchema);