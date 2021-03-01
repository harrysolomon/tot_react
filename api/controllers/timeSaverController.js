var schemas = require('../functions/schemas')
var time_save_functions = require('../functions/time_saved')
var TimeSaver = require('../models/time_saver');


exports.createData = (req, res) => {
    let result = schemas.line_chart_schema()
    console.log(result)

    let final_cur_employee_cost_array = time_save_functions.current_cost(req.body.inputs)
    let final_new_employee_cost_array = time_save_functions.new_cost(req.body.inputs)

    final_cur_employee_cost_array.reduce( (prev, curr,i) =>  result["data"]["datasets"][0]["data"][i] = Math.round(prev + curr), 0)
    final_new_employee_cost_array.reduce( (prev, curr,i) =>  result["data"]["datasets"][1]["data"][i] = Math.round(prev + curr), 0)

    let combined_cost = result["data"]["datasets"][0]["data"].concat(result["data"]["datasets"][1]["data"]);

    let minimum_val = Math.min.apply(Math, combined_cost);
    let maximum_val = Math.max.apply(Math, combined_cost);

    result["options"]["scales"]["yAxes"][0]["ticks"]["suggestedMin"] = minimum_val
    result["options"]["scales"]["yAxes"][0]["ticks"]["suggestedMax"] = maximum_val


    let test_data = [{
        "period": "hour"
    }]
    test_data[0]["value"] = 20

        req.body["values"] = test_data
        console.log(req.body)
        var new_data = new TimeSaver(req.body);
         new_data.save(function (err) {
            if (err) return console.log(err);
           console.log("saved successfully")
         })

         res.json(result)
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
        res.json(data);
      });
  };

  exports.timeSaverList = (req, res, next) => {
    TimeSaver.find().exec((err, data) => {
        if (err) {
          return res.sendStatus(404);
        }
        res.json(data);
      });
  };
