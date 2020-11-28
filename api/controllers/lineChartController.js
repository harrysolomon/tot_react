exports.lineChart = (req, res, next) => {
    let data = {
            labels:[],
            datasets: [
                {
                    data:[],
                    backgroundColor: "transparent",
                    borderColor: "#377dff",
                    borderWidth: 2,
                    pointRadius: 0,
                    hoverBorderColor: "#377dff",
                    pointBackgroundColor: "#377dff",
                    pointBorderColor: "#fff",
                    pointHoverRadius: 0
                },
                {
                    data:[],
                    backgroundColor: "transparent",
                    borderColor: "#00c9db",
                    borderWidth: 2,
                    pointRadius: 0,
                    hoverBorderColor: "#00c9db",
                    pointBackgroundColor: "#00c9db",
                    pointBorderColor: "#fff",
                    pointHoverRadius: 0
                }
            ]
        };

        let final_result = {}
        let draw_pct = 0.25
        let out_of_pocket_pct = 0.1
        let loan_pct = 0.8
        let total_cost = 200000
        let loan_eligible = 4
        let rev_1_eligible = 4
        let start_rev_1 = 60000
        let rev_1_increase = .02
        let rev_2_eligible = 0
        let start_rev_2 = 30000
        let rev_2_increase = .01
        let total_periods = 360
        let forecast_length = 10
        //let yearly_periods = total_periods/12
        let loan_rate = (.03 /12)
        let reinvest_rate = .03
    
        final_result["period"] = []
        final_result["out_of_pocket"] = []
        final_result["loan"] = []
        final_result["cost"] = []
        final_result["salary_1"] = []
        final_result["salary_2"] = []
    
        for (let i = 0;i <= forecast_length;++i) {
            //let period_result = {};
                final_result["period"].push("Y" + String(i))
    
                if (draw_pct * (i + 1) <= 1) {
                    let out_of_pocket = out_of_pocket_pct * draw_pct * total_cost;
                    final_result["out_of_pocket"].push(out_of_pocket)
                } else {
                    let out_of_pocket = 0
                    final_result["out_of_pocket"].push(out_of_pocket)
                }
    
                if (i >= loan_eligible) {
                    let loan = ((loan_rate * total_cost * loan_pct) / (1 - ((1+loan_rate) ** (-1 * total_periods)))) * 12
                    final_result["loan"].push(loan)
                } else {
                    let loan = 0
                    final_result["loan"].push(loan)
                }
    
                if (i >= rev_1_eligible) {
                    let s1 = start_rev_1*((1+(rev_1_increase))**(i - rev_1_eligible))
                    final_result["salary_1"].push(s1)
                } else {
                    let s1 = 0
                    final_result["salary_1"].push(s1)
                }
    
                if (i >= rev_2_eligible) {
                    let s2 = start_rev_2*((1+(rev_2_increase))**(i - rev_2_eligible))
                    final_result["salary_2"].push(s2)
                } else {
                    let s2 = 0
                    final_result["salary_2"].push(s2)
                }
                
            final_result["cost"].push(final_result["loan"][i] + final_result["out_of_pocket"][i]);
    
        }
    
        final_result["cum_opportunity_cash"] = []
        final_result["out_of_pocket"].reduce( (prev, curr,i) =>  final_result["cum_opportunity_cash"][i] = Math.round(((1+reinvest_rate) * prev) + curr), 0)
        
        final_result["cum_out_of_pocket"] = []
        final_result["out_of_pocket"].reduce( (prev, curr,i) =>  final_result["cum_out_of_pocket"][i] =  Math.round(prev + curr), 0)
    
        final_result["cum_loan"] = []
        final_result["loan"].reduce( (prev, curr,i) =>  final_result["cum_loan"][i] = Math.round(prev + curr), 0)
    
        final_result["cum_s1"] = []
        final_result["salary_1"].reduce( (prev, curr,i) =>  final_result["cum_s1"][i] = Math.round(prev + curr), 0)
    
        final_result["cum_s2"] = []
        final_result["salary_2"].reduce( (prev, curr,i) =>  final_result["cum_s2"][i] = Math.round(prev + curr), 0)
    
        final_result["total_opportunity_cash"] = []
    
        final_result["total_cost"] = []
    
        final_result["s1_income"] = []
    
        final_result["s2_income"] = []
    
        for(let i = 0; i < final_result["cum_opportunity_cash"].length; i++){
            final_result["total_opportunity_cash"].push(Math.round(final_result["cum_opportunity_cash"][i] + final_result["cum_loan"][i]));
         }
    
         for(let i = 0; i < final_result["cum_out_of_pocket"].length; i++){
            final_result["total_cost"].push(Math.round(final_result["cum_out_of_pocket"][i] + final_result["cum_loan"][i]));
         }
    
         for(let i = 0; i < final_result["total_cost"].length; i++){
            final_result["s1_income"].push(Math.round(final_result["cum_s1"][i] - final_result["total_cost"][i]))
         }
    
         for(let i = 0; i < final_result["total_opportunity_cash"].length; i++){
            final_result["s2_income"].push(Math.round(final_result["cum_s2"][i] + final_result["total_opportunity_cash"][i]));
         }
            

            data["labels"] = final_result["period"]
            data["datasets"][0]["data"] = final_result["s1_income"]
            data["datasets"][1]["data"] = final_result["s2_income"]
        
    res.json(data)
};


