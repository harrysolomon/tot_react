var schemas = require('../functions/schemas')
module.exports = {
    current_cost: function(req){
        let date_dict = schemas.date_dictionary()
        let interval = "quarter"
        let time_now_period = "hour"
        let forecast_length = 8
        let total_cur_employee_costs = 0
        
        for (let i = 0;i < req.length;++i){
            
            let cur_employee_cost = req[i].employees.cost * req[i].current_time_spent * date_dict[time_now_period][req[i].employees.period]

            total_cur_employee_costs += cur_employee_cost

        }
        
        let final_cur_employee_cost_array = []

        for (let i = 0;i < forecast_length;++i) {
            final_cur_employee_cost_array.push(total_cur_employee_costs)
        }
        return final_cur_employee_cost_array
    },

    new_cost: function(req){
        let date_dict = schemas.date_dictionary()
        let interval = "quarter"
        let time_now_period = "hour"
        let forecast_length = 8
        let total_new_employee_costs = 0

        for (let i = 0;i < req.length;++i){
            
            if(req[i].products.time_unit === "pct"){
                time_save_convert = req[i].current_time_spent * (req[i].products.time_save / 100)
            } else {
                time_save_convert = req[i].products.time_save * date_dict[req[i].products.time_unit][time_now_period]
            }
            
            let product_cost_rate = req[i].products.cost * date_dict[interval][req[i].products.period]
            let new_employee_cost = (req[i].employees.cost * (req[i].current_time_spent - time_save_convert) * date_dict[time_now_period][req[i].employees.period]) + product_cost_rate

            total_new_employee_costs += new_employee_cost

        }
        
        let final_new_employee_cost_array = []

        for (let i = 0;i < forecast_length;++i) {
            final_new_employee_cost_array.push(total_new_employee_costs)
        }
        return final_new_employee_cost_array
    }
}