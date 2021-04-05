import { useEffect, useState } from "react"

export const useFetch = (url1, url2) => {
    const [state, setState] = useState({ data1: null, data2: null, loading: true})

    useEffect(() => {
        setState({ data1: null, data2: null, loading: true});
        Promise.all([
            fetch(url1),
            fetch(url2)
        ])
            .then(([x1,x2]) => Promise.all([x1.text(),x2.text()]))
            .then(([y1, y2]) => {
                setState({ data1: y1, data2: y2, loading: false})
            });
    },[url1,url2]);

    return state;
}