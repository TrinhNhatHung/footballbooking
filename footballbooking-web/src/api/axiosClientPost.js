import axios from 'axios';
import queryString from 'query-string';

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClientPost = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    // paramsSerializer: params => params
    paramsSerializer: params => queryString.stringify(params),
});

axiosClientPost.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
});

axiosClientPost.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }

    return response;
}, (error) => {
    // Handle errors
    throw error;
});

export default axiosClientPost;

// import axios from "axios";
// import queryString from 'query-string';

// const axiosClientPost = axios.create({
//     baseURL: "http://localhost:8080/",
//     headers: {
//         'content-type': 'application/x-www-form-urlencoded'
//     },

//     paramsSerializer: params => queryString.stringify(params)
// });

// axiosClientPost.interceptors.response.use((response) => {

//     return response;
// }, (error) => {
//     // Handle errors
//     throw error;
// });

// export default axiosClientPost;