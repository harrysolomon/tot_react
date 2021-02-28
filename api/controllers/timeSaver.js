var schemas = require('../functions/schemas')
var time_save_functions = require('../functions/time_saved')
exports.timeSaver = (req, res, next) => {

    
    /*let request = [
        {
            "cadences":{
                "id":2,
                "period":"quarter",
                "name":"Quarterly"
            },
            "current_time_spent":10,
            "name": "Harrisons Test",
            "employees":{
                "id":1,
                "cost":50000,
                "name":"Analyst",
                "period":"year"
            },
            "products":{
                "id":1,
                "name":"Cool Product",
                "cost": 10000,
                "period": "year",
                "time_save":8,
                "time_unit":"hour"   
            }
        }
    ]*/

    let result = schemas.line_chart_schema()

    let final_cur_employee_cost_array = time_save_functions.current_cost(req.body)
    let final_new_employee_cost_array = time_save_functions.new_cost(req.body)

    final_cur_employee_cost_array.reduce( (prev, curr,i) =>  result["data"]["datasets"][0]["data"][i] = Math.round(prev + curr), 0)
    final_new_employee_cost_array.reduce( (prev, curr,i) =>  result["data"]["datasets"][1]["data"][i] = Math.round(prev + curr), 0)

    let combined_cost = result["data"]["datasets"][0]["data"].concat(result["data"]["datasets"][1]["data"]);

    let minimum_val = Math.min.apply(Math, combined_cost);
    let maximum_val = Math.max.apply(Math, combined_cost);

    result["options"]["scales"]["yAxes"][0]["ticks"]["suggestedMin"] = minimum_val
    result["options"]["scales"]["yAxes"][0]["ticks"]["suggestedMax"] = maximum_val


  res.json(result)
};