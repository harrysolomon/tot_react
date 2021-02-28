module.exports = {

    line_chart_schema: function(){
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
                "data": [],
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
        return result
    },

    date_dictionary: function(){
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
        return date_dict
    }
}