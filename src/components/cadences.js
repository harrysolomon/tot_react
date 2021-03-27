const the_cadences = [
    {
        "_id": "1",
        "name": "Daily",
        "period": "day",
        "plural": "Days",
        "abbr": "Days",
        "singular": "Day"
    },
    {
        "_id": "2",
        "name": "Weekly",
        "period": "week",
        "plural": "Weeks",
        "abbr": "Wks",
        "singular": "Week"
    },
    {
        "_id": "3",
        "name": "Monthly",
        "period": "month",
        "plural": "Months",
        "abbr": "Mths",
        "singular": "Week"
    },
    {
        "_id": "4",
        "name": "Quarterly",
        "period": "quarter",
        "plural": "Quarters",
        "abbr": "Qtrs",
        "singular": "Quarter"
    },
    {
        "_id": "5",
        "name": "Annually",
        "period": "year",
        "plural": "Years",
        "abbr": "Yrs",
        "singular": "Year"
    },
    {
        "_id": "6",
        "name": "Hourly",
        "period": "hour",
        "plural": "Hours",
        "abbr": "Hrs",
        "singular": "Hour"
    }
]

export const cadences = process.env.NODE_ENV === 'development' ? the_cadences : the_cadences;