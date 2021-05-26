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

export const useFetchProduct = (productUrl) => {
    const [state, setState] = useState({ product: null, productLoading: true})

    useEffect(() => {
        setState({ product: null, productLoading: true});
        Promise.all([
            fetch(config.url.API_URL + productUrl)  
        ])
            .then(([x1]) => Promise.all([x1.json()]))
            .then(([y1]) => {
                setState({ product: y1, productLoading: false})
            });
    },[productUrl]);

    return state;
}

export const useFetchWorker = (workerUrl) => {
    const [state, setState] = useState({ worker: null, workerLoading: true})

    useEffect(() => {
        setState({ worker: null, workerLoading: true});
        Promise.all([
            fetch(config.url.API_URL + workerUrl)  
        ])
            .then(([x1]) => Promise.all([x1.json()]))
            .then(([y1]) => {
                setState({ worker: y1, workerLoading: false})
            });
    },[workerUrl]);

    return state;
}

export const useFetchCadences = (cadencesUrl) => {
    const [state, setState] = useState({ cadences: null, cadencesLoading: true})

    useEffect(() => {
        setState({ cadences: null, cadencesLoading: true});
        Promise.all([
            fetch(config.url.API_URL + cadencesUrl)  
        ])
            .then(([x1]) => Promise.all([x1.json()]))
            .then(([y1]) => {
                setState({ cadences: y1, cadencesLoading: false})
            });
    },[cadencesUrl]);

    return state;
}

export const useFetchCalculator = (calculatorUrl) => {
    const [state, setState] = useState({ calculator: null, calculatorLoading: true})

    useEffect(() => {
        setState({ calculator: null, calculatorLoading: true});
        Promise.all([
            fetch(config.url.API_URL + calculatorUrl)  
        ])
            .then(([x1]) => Promise.all([x1.json()]))
            .then(([y1]) => {
                setState({ calculator: y1, calculatorLoading: false})
            });
    },[calculatorUrl]);

    return state;
}

export const useFetchCalculatorInputs = (calculatorInputsUrl) => {
    const [state, setState] = useState({ calculatorInputs: null, calculatorInputsLoading: true})

    useEffect(() => {
        setState({ calculatorInputs: null, calculatorInputsLoading: true});
        Promise.all([
            fetch(config.url.API_URL + calculatorInputsUrl)  
        ])
            .then(([x1]) => Promise.all([x1.json()]))
            .then(([y1]) => {
                setState({ calculatorInputs: y1, calculatorInputsLoading: false})
            });
    },[calculatorInputsUrl]);

    return state;
}