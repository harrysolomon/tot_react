function payments (rate, presentValue, periods) {
    let payment = (rate*presentValue)/(1-((1+rate)**-periods))

    return payment
};