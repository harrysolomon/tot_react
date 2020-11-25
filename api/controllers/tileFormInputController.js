var TilesFormInput = require('../models/tiles__form_inputs');

exports.form_input = (req, res, next) => {
    TilesFormInput.find({ tile_id: req.params.id})
    .sort({rank: 'asc'})
      .exec((err, data) => {
        if (err) {
          return res.sendStatus(404);
        }
        res.json(data);
      });
  };