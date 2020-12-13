//Is this tech debt to not define state in the schema?

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TileFormInputSchema = new Schema(
  {
    tile_id: {type: Schema.Types.ObjectId, ref: 'Tiles', required: true},
    form_id: {type: String, required: true, maxlength: 100},
    form_name: {type: String, required: true, maxlength: 100},
    default_value: {type: String, required: true, maxlength: 100},
    rank: {type: Number, required: true},
    hidden: {type: Boolean, required: true},
    state: {type: String, required: true, maxlength: 100}
  },
  {collection: 'tiles__form_inputs'}
);

//Export model
module.exports = mongoose.model('TilesFormInput', TileFormInputSchema);