exports.timeSaver = (req, res, next) => {


let result = {
    "data": {
      "labels": [
        "2020-Q1",
        "2020-Q2",
        "2020-Q3",
        "2020-Q4",
        "2021-Q1",
        "2021-Q2",
        "2021-Q3",
        "2021-Q4"
      ],
      "datasets": [
        {
          "data": [],
          "backgroundColor": "transparent",
          "borderColor": "#377dff",
          "borderWidth": 2,
          "pointRadius": 0,
          "hoverBorderColor": "#377dff",
          "pointBackgroundColor": "#377dff",
          "pointBorderColor": "#fff",
          "pointHoverRadius": 0
        },
        {
          "data": [
          ],
          "backgroundColor": "transparent",
          "borderColor": "#00c9db",
          "borderWidth": 2,
          "pointRadius": 0,
          "hoverBorderColor": "#00c9db",
          "pointBackgroundColor": "#00c9db",
          "pointBorderColor": "#fff",
          "pointHoverRadius": 0
        }
      ]
    },
    "options": {
      "legend": {
        "display": false
      },
      "scales": {
        "yAxes": [
          {
            "gridLines": {
              "color": "#e7eaf3",
              "drawBorder": false,
              "zeroLineColor": "#e7eaf3"
            },
            "ticks": {
              "suggestedMin": -20168,
              "suggestedMax": 430091,
              "fontColor": "#97a4af",
              "fontFamily": "Open Sans, sans-serif",
              "padding": 10,
              "postfix": "k"
            }
          }
        ],
        "xAxes": [
          {
            "gridLines": {
              "display": false,
              "drawBorder": false
            },
            "ticks": {
              "fontSize": 12,
              "fontColor": "#97a4af",
              "fontFamily": "Open Sans, sans-serif",
              "padding": 5
            }
          }
        ]
      },
      "tooltips": {
        "hasIndicator": true,
        "mode": "index",
        "intersect": false,
        "lineMode": true,
        "lineWithLineColor": "rgba(19, 33, 68, 0.075)"
      },
      "hover": {
        "mode": "nearest",
        "intersect": true
      }
    }
  }

  let date_dict = {
      "year": {
              "hour": 2096,
              "day": 262,
              "quarter": 4,
              "year": 1
        },
        "day":{
            "hour": 8,
            "year": (1/262),
            "quarter": (1/65.5),
            "day": 1
        },
        "hour":{
            "day":  (1/8),
            "year": (1/(262*8)),
            "quarter": (1/((262/4)*8)),
            "hour": 1
        },
        "quarter":{
            "hour": 524,
            "day": 65.5,
            "year": (1/4),
            "quarter": 1
        }
  }

  let interval = "quarter"
  
  let time_now = 10
  let time_now_period = "day"

  let time_save = 8
  let time_save_period = "hour"
  let time_save_convert = time_save * date_dict[time_save_period][time_now_period]
  let product_cost = 10000
  let product_cost_period = "year"
  let product_cost_rate = product_cost * date_dict[interval][product_cost_period]
  
  let cur_avg_cost = 50000
  let cost_period = "year"
  let employee = 2

  let forecast_length = 8

  let cur_cost = (cur_avg_cost * employee)* time_now * date_dict[time_now_period][cost_period]
  let cur_cost_array = []

  let new_cost = ((cur_avg_cost * employee)* (time_now - time_save_convert) * date_dict[time_now_period][cost_period]) + product_cost_rate
  let new_cost_array = []

  

  for (let i = 0;i < forecast_length;++i) {
      cur_cost_array.push(cur_cost)
      new_cost_array.push(new_cost)
  }

  cur_cost_array.reduce( (prev, curr,i) =>  result["data"]["datasets"][0]["data"][i] = Math.round(prev + curr), 0)
  new_cost_array.reduce( (prev, curr,i) =>  result["data"]["datasets"][1]["data"][i] = Math.round(prev + curr), 0)

  let combined_cost = result["data"]["datasets"][0]["data"].concat(result["data"]["datasets"][1]["data"]);

    let minimum_val = Math.min.apply(Math, combined_cost);
    let maximum_val = Math.max.apply(Math, combined_cost);

    result["options"]["scales"]["yAxes"][0]["ticks"]["suggestedMin"] = minimum_val
    result["options"]["scales"]["yAxes"][0]["ticks"]["suggestedMax"] = maximum_val

  /*final_result["cum_s2"] = []
            final_result["salary_2"].reduce( (prev, curr,i) =>  final_result["cum_s2"][i] = Math.round(prev + curr), 0)*/


  res.json(result)
};