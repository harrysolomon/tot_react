const tooltip_definitions = {
    "name": "Name of the task performed",
    "product": "What product or service best resembles this task?",
    "current_time_spent": "How much time is currently being spent on this task?",
    "employee": "Title of employee who performs this task",
    "cadence": "How often is the employee repeating this task?"
}

export const definitions = process.env.NODE_ENV === 'development' ? tooltip_definitions : tooltip_definitions;