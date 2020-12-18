//Is this tech debt to not define state in the schema?

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TileFormInputTest = new Schema(
  {
    tile_id: {type: Schema.Types.ObjectId, ref: 'Tiles', required: true},
    parent: {type: String, required: true},
    rank: {type: Number, required: true}, 
    inputs: [{
        form_id: {type: String, required: true},
        form_name: {type: String, required: true},
        default_value: {type: String, required: true},
        type: {type: String, required: true},
        state: {type: String, required: true}
    }]
    
  },
  {collection: 'tiles__form_inputs_test'}
);

//Export model
module.exports = mongoose.model('FormInputTest', TileFormInputTest);