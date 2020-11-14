var TilesFormInput = require('../models/tiles__form_inputs');

exports.form_input = (req, res, next) => {
    TilesFormInput.find({ tile_id: '5fac52be03ff66099d9a8ef4'})
    .sort({rank: 'asc'})
      .exec((err, data) => {
        if (err) {
          return res.sendStatus(404);
        }
        res.json(data);
      });
  };