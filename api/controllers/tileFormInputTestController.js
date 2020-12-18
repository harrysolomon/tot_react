var FormInputTest = require('../models/tile_form_input_test');

exports.form_input_test = (req, res, next) => {
    FormInputTest.find({ 
        tile_id: req.params.id
      })
    .sort({rank: 'asc'})
      .exec((err, data) => {
        if (err) {
          return res.sendStatus(404);
        }
        res.json(data);
      });
  };