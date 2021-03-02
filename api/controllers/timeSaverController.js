var time_save_functions = require('../functions/time_saved')
var TimeSaver = require('../models/time_saver');


exports.createData = (req, res) => {
    
    let chart_data = time_save_functions.new_cost(req.body.inputs)
    
    let test_data = [{
        "period": "hour"
    }]
    test_data[0]["value"] = 20

    req.body["values"] = test_data
    
    var new_data = new TimeSaver(req.body);

    
    new_data.save(function (err) {
        if (err) return console.log(err);
        console.log("saved successfully")
    })
    
    req.body["data"] = chart_data["data"]
    req.body["options"] = chart_data["options"]

        res.json(req.body)
};

exports.updateData = (req, res) => {
    TimeSaver.findByIdAndUpdate(req.params.id,req.body, {}, function (err) {
        if (err) return console.log(err);
    })

    res.json(req.body)
};

exports.getData = (req, res, next) => {
    TimeSaver.find(
        {_id: req.params.id})
      .exec((err, data) => {
        if (err) {
          return res.sendStatus(404);
        }

        let result = data
        let chart_data = time_save_functions.new_cost(result[0].inputs)
        result["data"] = chart_data["data"]
        result["options"] = chart_data["options"]

        console.log(result)
        
        res.json(result);
      }

      );
  };

  exports.timeSaverList = (req, res, next) => {
    TimeSaver.find().exec((err, data) => {
        if (err) {
          return res.sendStatus(404);
        }
        res.json(data);
      });
  };
