export const timesaver_rows = [
    {
        "cadence": "",
        "time_saver_worker_id": "",
        "time_saver_product_id": "",
        "current_time_spent": "",
        "current_time_spent_period": "",
        "name": "",
        "id": 1
    }
];

export const timesaver_cells = [
    {
        multiInput: false,
        name: "name",
        inputs: [
            {
                name: "name",
                type: "text",
                isParent: true,
                size: 2,
                select: null
            }
        ],
    },
    {
        multiInput: false,
        name: "time_saver_worker_id",
        inputs: [
            {
                name: "time_saver_worker_id",
                type: "select",
                isParent: true,
                size: 2,
                select: {
                    options: [],
                    optionName: "name"
                }
            }
        ]
    },
    {
        multiInput: true,
        name: "time_spent",
        size: 3,
        inputs: [
            {
                name: "current_time_spent",
                type: "text",
                isParent: false,
                size: 3,
                select: null
            },
            {
                name: "current_time_spent_period",
                type: "select",
                isParent: false,
                size: 4,
                select: {
                    options: [],
                    optionName: "plural"
                }
            },
            {
                name: "per",
                type: "static",
                size: 1
            },
            {
                name: "cadence",
                type: "select",
                isParent: false,
                size: 4,
                select: {
                    options: [],
                    optionName: "singular"
                }
            }
        ]
    },
    {
        multiInput: false,
        name: "time_saver_product_id",
        inputs: [
            {
                name: "time_saver_product_id",
                type: "select",
                isParent: true,
                size: 2,
                select: {
                    options: [],
                    optionName: "name"
                }
            }
        ]
    }
    
];