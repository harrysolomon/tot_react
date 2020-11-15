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


    /*    data: {
            labels: ["Y0","Y1","Y2","Y3","Y4","Y5","Y6","Y7","Y8","Y9","Y10","Y11"],
              datasets: [
                {
                data: [-1,-3,-5,-7,5,11,20,45,70,100,115,140],
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
                data: [0,10,20,30,40,50,60,70,90,100,110,120],
                backgroundColor: "transparent",
                borderColor: "#00c9db",
                borderWidth: 2,
                pointRadius: 0,
                hoverBorderColor: "#00c9db",
                pointBackgroundColor: "#00c9db",
                pointBorderColor: "#fff",
                pointHoverRadius: 0
                }
            ],
        }*/