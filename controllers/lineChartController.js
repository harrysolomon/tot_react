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
    
    let max_length = 10
        for (let i = 1;i <= max_length;++i) {
            let label = "Y"+String(i);
                data.labels.push(label);
            let result_1 = i*5;
                data.datasets[0].data.push(result_1);
            let result_2 = i*8;
                data.datasets[1].data.push(result_2)
            }
        
    res.json(data)
};


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