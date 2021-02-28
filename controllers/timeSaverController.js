var TimeSaver = require('../models/time_saver');

let test_data = {
    "name": "Harrison Test Calculator",
    "values":[
        {
            "period":"hour",
            "value": 50
        },
        {
            "period":"quarter",
            "value": 100
        }
    ],
    "inputs":[
        {
            "cadences":{
                "period":"quarter",
                "name":"Quarterly"
            },
            "current_time_spent":10,
            "name": "Harrisons Test",
            "employees":{
                "cost":50000,
                "name":"Analyst",
                "period":"year"
            },
            "products":{
                "name":"Cool Product",
                "cost": 10000,
                "period": "year",
                "time_save":8,
                "time_unit":"hour"   
            }
        }
    ]
}

exports.createData = (req, res) => {
         var new_data = new TimeSaver(test_data);
         new_data.save(function (err) {
            if (err) return console.log(err);
           console.log("saved successfully")
         })

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
