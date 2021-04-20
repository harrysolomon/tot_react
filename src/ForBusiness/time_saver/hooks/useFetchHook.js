import { useEffect, useState } from "react"
import { config } from '../../../constants'

export const useFetch = (url1, url2) => {
    const [state, setState] = useState({ data1: null, data2: null, loading: true})

    useEffect(() => {
        setState({ data1: null, data2: null, loading: true});
        Promise.all([
            fetch(config.url.API_URL + url1),
            fetch(config.url.API_URL + url2)    
        ])
            .then(([x1,x2]) => Promise.all([x1.json(),x2.json()]))
            .then(([y1, y2]) => {
                setState({ data1: y1, data2: y2, loading: false})
            });
    },[url1,url2]);

    return state;
}