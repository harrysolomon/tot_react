var Cost = require('../models/cost');

exports.cost = (req, res, next) => {
    Cost.find({ 
        tile_id: req.params.id
      })
      .exec((err, data) => {
        if (err) {
          return res.sendStatus(404);
        }
        res.json(data);
      });
  };