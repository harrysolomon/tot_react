//Is this tech debt to not define state in the schema?

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CostSchema = new Schema(
  {
    tile_id: {type: Schema.Types.ObjectId, ref: 'Tiles', required: true},
    scenario_type: {type: String},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    default: {type: Boolean, required: true}
  },
  {collection: 'costs'}
);

//Export model
module.exports = mongoose.model('Costs', CostSchema);