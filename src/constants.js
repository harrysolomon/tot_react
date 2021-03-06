//This is where I will put all of the api calls based on environment
const prod = {
    url: {
     API_URL: 'https://ro-why-api.herokuapp.com/'
    }
};
const dev = {
    url: {
     API_URL: 'http://localhost:3000/v1/'
    }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;