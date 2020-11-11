var Tiles = require('../models/tiles');

exports.tile_list = (req, res, next) => {
    Tiles.find()
      .exec((err, data) => {
        if (err) {
          return res.sendStatus(404);
        }
        res.json(data);
      });
  };

