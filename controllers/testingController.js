exports.testing = (req, res, next) => {
    //let data = cost(20000,10)

    let final_result = {}
    let draw_pct = 0.25
    let out_of_pocket_pct = 0.1
    let loan_pct = 0.8
    let total_cost = 200000
    let loan_eligible = 4
    let rev_1_eligible = 4
    let rev_2_eligible = 0
    let total_periods = 360
    let forecast_length = 10
    let yearly_periods = total_periods/12
    let loan_rate = (.03 /12)
    let reinvest_rate = .03

    final_result["period"] = []
    final_result["out_of_pocket"] = []
    final_result["loan"] = []
    final_result["cost"] = []
    final_result["revenue"] = []




    for (let i = 0;i <= forecast_length;++i) {
        //let period_result = {};
            final_result["period"].push(i)

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
            
        final_result["cost"].push(final_result["loan"][i] + final_result["out_of_pocket"][i]);

        final_result["revenue"].push(2000)
    }

    final_result["cum_opportunity_cash"] = []
    final_result["out_of_pocket"].reduce( (prev, curr,i) =>  final_result["cum_opportunity_cash"][i] = ((1+reinvest_rate) * prev) + curr, 0)
    
    final_result["cum_loan"] = []
    final_result["loan"].reduce( (prev, curr,i) =>  final_result["cum_loan"][i] = prev + curr, 0)

    final_result["total_opportunity_cash"] = []

    for(let i = 0; i < final_result["cum_opportunity_cash"].length; i++){
        final_result["total_opportunity_cash"].push(final_result["cum_opportunity_cash"][i] + final_result["cum_loan"][i]);
     }
        
        
        
    res.json(final_result);
};

/*function cost (cost,periods) {
    let cost_data = []
    for (let i = 1;i <= periods;++i) {
        cost_data.push(cost)
    }

};*/

/*
function(
    cost, 
    draw_pct[array], 
    forecast_period, 
    forecast_length, 
    loan_period,
    pct_loan, 
    pct_scholarship,
    pct_out_of_pocket
    ) {
    
    if forecast_period = Year & loan_period = month
        then let periods = 12*forecast_length
    else if forecast_period = month & loan_period = year
        then let periods = forecast_length / 12
    else if forecast_period = loan_period
        then let periods = forecast_length
    for each draw period and forecast period (somehow need to align them):
        
        if period > 1 then:
            prev_val = array[year-1]
            else: place 0 in each array
        
        let prev_out_of_pocket_oppty = prev_val["out_of_pocket_oppty"] * (1 + reinvestment)
        let out_of_pocket_oppty = (cost * out_of_pocket * draw_pct) + prev_out_of_pocket
        let out_of_pocket = (cost * out_of_pocket * draw_pct) + prev_val["out_of_pocket"]


        if (loan_eligibility): {
            need to think about if the loan runs out before the forecast period is over. 
            Maybe use loan eligibility
            let loan = loan(.03,periods, (cost*pct_loan) ) + prev_val["loan"]

        else:
            let loan = 0
        }

        let opportunity_cost = loan + out_of_pocket_oppty
        let cost = loan + out_of_pocket
        let salary_1 = salary()
        let salary_2 = salary()
    return {
        Data: [{
            year: 1,
            scholarship: 300,
            out_of_pocket: 200,
            loan: 0,
            opportunity_cash: 200 - this will be adjusted by a re-investment number
            total_cost
        }],
        Totals: {
            s1_income,
            s2_income,
            s1_cost,
            s2_cost,
            s1_earnings,
            s2_earnings
        }
        
    }
}

function loan(rate, period, present_value)

function salary(starting_salary, growth_rate_array, forecast_period) {
    //growth_rate_array = [
        {
            year: 3,
            pct_increase: .03
        },
        {
            year: 7,
            pct_increase: .05
        }
    ]


}



*/