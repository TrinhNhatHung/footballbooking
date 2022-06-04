import axiosClientPost from "./axiosClientPost";
import queryString from 'query-string';

const userApi = {
    checkLogin: (params) => {
        const url = 'userservice/checkLogin'
        var data = queryString.stringify(params);
        return axiosClientPost.post(url, data)
    },

    signUp: (params) => {
        const url = 'userservice/signUp'
        var data = queryString.stringify(params);
        return axiosClientPost.post(url, data)
    },

    updateUser: (params) => {
        console.log(params)
        const url = 'userservice/updateProfile'
        var data = queryString.stringify(params);
        return axiosClientPost.post(url, data)
    }
}

export default userApi; 