var schemas = require('../functions/schemas')
module.exports = {
    new_cost: function(req, query){
        console.log(query.hasOwnProperty('period'))
        let date_dict = schemas.date_dictionary()

        if(query.hasOwnProperty('period')) {
            interval = query.period
        } else {
            interval = "quarter"
        }

        if(query.hasOwnProperty('range')) {
            forecast_length = query.range
        } else {
            forecast_length = 8
        }

        let time_now_period = "hour"
        let total_new_employee_costs = 0
        let total_cur_employee_costs = 0

        
        for (let i = 0;i < req.length;++i){
            
            if(req[i].products.time_unit === "pct"){
                time_save_convert = req[i].current_time_spent * (req[i].products.time_save / 100)
            } else {
                time_save_convert = req[i].products.time_save * date_dict[req[i].products.time_unit][time_now_period]
            }

            //calculates cost of employee to do the task once
            let cur_cost_per_task = req[i].employees.cost * req[i].current_time_spent * date_dict[time_now_period][req[i].employees.period]
            let cur_cost_per_period = cur_cost_per_task * date_dict[interval][req[i].cadences.period]
            
            let product_cost_rate = req[i].products.cost * date_dict[interval][req[i].products.period]
            let new_cost_per_task = (req[i].employees.cost * (req[i].current_time_spent - time_save_convert) * date_dict[time_now_period][req[i].employees.period]) + product_cost_rate
            let new_cost_per_period = new_cost_per_task * date_dict[interval][req[i].cadences.period]
            
            total_new_employee_costs += new_cost_per_period
            total_cur_employee_costs += cur_cost_per_period
            

        }
        
        let final_new_employee_cost_array = []
        let final_cur_employee_cost_array = []

        for (let i = 0;i < forecast_length;++i) {
            final_new_employee_cost_array.push(total_new_employee_costs)
            final_cur_employee_cost_array.push(total_cur_employee_costs)
        }
        //console.log(final_new_employee_cost_array)

        let result = schemas.line_chart_schema()

        for (let increment = 1; increment <= forecast_length;++increment){
            result["data"]["labels"].push("Q"+increment)
        }

        final_cur_employee_cost_array.reduce( (prev, curr,i) =>  result["data"]["datasets"][0]["data"][i] = Math.round(prev + curr), 0)
        final_new_employee_cost_array.reduce( (prev, curr,i) =>  result["data"]["datasets"][1]["data"][i] = Math.round(prev + curr), 0)

        let combined_cost = result["data"]["datasets"][0]["data"].concat(result["data"]["datasets"][1]["data"]);

        let minimum_val = Math.min.apply(Math, combined_cost);
        let maximum_val = Math.max.apply(Math, combined_cost);

        result["options"]["scales"]["yAxes"][0]["ticks"]["suggestedMin"] = minimum_val
        result["options"]["scales"]["yAxes"][0]["ticks"]["suggestedMax"] = maximum_val


        return result
    }
}