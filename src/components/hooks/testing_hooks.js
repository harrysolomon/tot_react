import React, {useState} from "react"
import { useFetch } from "./useFetchHook";
import { useForm } from './useForm'



const App = () => {
    const [values, handleChange] = useForm({email: '', password: ''})

    const {data1, data2, loading } = useFetch("http://numbersapi.com/43/trivia","http://numbersapi.com/44/trivia"); 

    const Welcome = () => {
        return <div>suppity sup {values.email}</div>
    }

    return (
        <div>
        <div>
            <div>{loading ? '...loading' : data1}</div>
            <div>{loading ? '...loading' : data2}</div>
            <input
            name="email"
            value={values.email}
            onChange={handleChange}
            />
            <input
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            />
        </div>
        <Welcome />
        </div>
    )
};

export default App;