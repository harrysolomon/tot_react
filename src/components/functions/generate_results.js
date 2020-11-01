//import React from "react";
//import uniqid from "uniqid";



export const multiply = (forecastRange,rate,presentValue,numPeriods) => {
  return forecastRange.map((year) => {
    const payments = ((rate*presentValue)/(1-((1+rate)**-numPeriods)));
    return `${payments}`;
  });
};
/*
const lineData = {
  "type": "line",
  "data": {
      "labels": ["Y0","Y1","Y2","Y3","Y4","Y5","Y6","Y7","Y8","Y9","Y10","Y11"],
      "datasets": [{
      "data": [-1,-3,-5,-7,5,11,20,45,70,100,115,140],
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
      //"data": [0,10,20,30,40,50,60,70,90,100,110,120],
      "backgroundColor": "transparent",
      "borderColor": "#00c9db",
      "borderWidth": 2,
      "pointRadius": 0,
      "hoverBorderColor": "#00c9db",
      "pointBackgroundColor": "#00c9db",
      "pointBorderColor": "#fff",
      "pointHoverRadius": 0
      }]
  },
  "options": {
      "scales": {
          "yAxes": [{
          "gridLines": {
              "color": "#e7eaf3",
              "drawBorder": false,
              "zeroLineColor": "#e7eaf3"
          },
          "ticks": {
              "min": 0,
              "max": 160,
              "stepSize": 20,
              "fontColor": "#97a4af",
              "fontFamily": "Open Sans, sans-serif",
              "padding": 10,
              "postfix": "k"
          }
          }],
          "xAxes": [{
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
          }]
      },
      "tooltips": {
      "prefix": "$",
      "postfix": "k",
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

  const append = {
    ...lineData,
    data: {
      ...lineData.data,

    }

  }*/