const the_cadences = [
    {
        "id": "6",
        "name": "Hourly",
        "period": "hour",
        "plural": "Hours",
        "abbr": "Hrs",
        "singular": "Hour"
    },
    {
        "id": "1",
        "name": "Daily",
        "period": "day",
        "plural": "Days",
        "abbr": "Days",
        "singular": "Day"
    },
    {
        "id": "2",
        "name": "Weekly",
        "period": "week",
        "plural": "Weeks",
        "abbr": "Wks",
        "singular": "Week"
    },
    {
        "id": "3",
        "name": "Monthly",
        "period": "month",
        "plural": "Months",
        "abbr": "Mths",
        "singular": "Month"
    },
    {
        "id": "4",
        "name": "Quarterly",
        "period": "quarter",
        "plural": "Quarters",
        "abbr": "Qtrs",
        "singular": "Quarter"
    },
    {
        "id": "5",
        "name": "Annually",
        "period": "year",
        "plural": "Years",
        "abbr": "Yrs",
        "singular": "Year"
    }
]

export const cadences = process.env.NODE_ENV === 'development' ? the_cadences : the_cadences;