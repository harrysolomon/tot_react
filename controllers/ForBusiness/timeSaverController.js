var time_save_functions = require('../../functions/time_saved')
var TimeSaver = require('../../models/ForBusiness/time_saver');
var TimeSaverProductSchema = require('../../models/ForBusiness/time_saver_products')
var TimeSaverEmployeeSchema = require('../../models/ForBusiness/time_saver_employees')



exports.createData = (req, res) => {
    
    let chart_data = time_save_functions.new_cost(req.body.inputs)
    
    let test_data = [{
        "period": "hour"
    }]
    test_data[0]["value"] = 20

    req.body["values"] = test_data
    
    var new_data = new TimeSaver(req.body);

    
    new_data.save(function (err, data) {
        if (err) {
            return console.log(err)
        };

        console.log("saved successfully")
        req.body["_id"] = data._id

        req.body["data"] = chart_data["data"]
        req.body["options"] = chart_data["options"]

        res.json(req.body)
    })

};

exports.updateData = (req, res) => {
    //reserving a section here for recalculating the value portion
    TimeSaver.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, doc) => {
        if (err) {
            return console.log(err)
    }

    res.json(doc)
    })};

exports.getData = (req, res, next) => {
    TimeSaver.find(
        {_id: req.params.id})
      .exec((err, data) => {
        if (err) {
          return res.sendStatus(404);
        } 
        let result = {
            meta: {},
            graph_data: {}
        }
        
        let chart_data = time_save_functions.new_cost(data[0].inputs)
        
        result.meta = data
        result.graph_data = chart_data

        res.json(result)
        
      });
  };

exports.timeSaverList = (req, res, next) => {
    TimeSaver.find()
    .exec((err, data) => {
        if (err) {
            return res.sendStatus(404);
        }
        res.json(data)
    });
};

exports.productList = (req, res, next) => {
    TimeSaverProductSchema.find()
    .exec((err, data) => {
        if (err) {
            return res.sendStatus(404);
        }

        let response = []

        data.map((product) => {
            let a_product = {}
            for (let i = 0; i < req.body.length; ++i){
                
                let field = req.body[i]
                a_product[field] = product[field]
                
            }
            response.push(a_product)
            
        })

        res.json(response)
    });
};

exports.product = (req, res, next) => {
    TimeSaverProductSchema.find(
        {_id: req.params.id})
      .exec((err, data) => {
        if (err) {
          return res.sendStatus(404);
        } 
        console.log(data)
        let response = []

        data.map((product) => {
            let a_product = {}
            for (let i = 0; i < req.body.length; ++i){
                
                let field = req.body[i]
                a_product[field] = product[field]
                
            }
            response.push(a_product)
            
        })

        res.json(response)
        
      });
  };

exports.employeeList = (req, res, next) => {
    TimeSaverEmployeeSchema.find()
    .exec((err, data) => {
        if (err) {
            return res.sendStatus(404);
        }
        let response = []

        data.map((employee) => {
            let a_employee = {}
            for (let i = 0; i < req.body.length; ++i){
                
                let field = req.body[i]
                a_employee[field] = employee[field]
                
            }
            response.push(a_employee)
            
        })

        res.json(response)
    });
};

exports.employee = (req, res, next) => {
    TimeSaverEmployeeSchema.find(
        {_id: req.params.id})
      .exec((err, data) => {
        if (err) {
          return res.sendStatus(404);
        } 

        let response = []

        data.map((employee) => {
            let a_employee = {}
            for (let i = 0; i < req.body.length; ++i){
                
                let field = req.body[i]
                a_employee[field] = employee[field]
                
            }
            response.push(a_employee)
            
        })

        res.json(response)
        
      });
  };


    