import axios from "axios";
import axiosClient from "./axiosClient";
import axiosClientPost from "./axiosClientPost";
import queryString from 'query-string';


const adminApi = {
    getListUsers: () => {
        var data = new FormData();
        var config = {
            url: "/userservice/getAllUser",
            method: "GET",
            data,
            headers: {
                "Authorization": localStorage.getItem("token"),
                ...data.getHeaders,
            },
        };

        return axiosClientPost(config)
    },
    updateStatusAccount: (userId) => {
        console.log("userId:", userId)
        var data = new FormData();
        data.append("userId", userId);
        var config = {
            url: "/userservice/toggleStatus",
            method: "POST",
            data,
            headers: {
                "Authorization": localStorage.getItem("token"),
                ...data.getHeaders,
            },
        };

        return axiosClientPost(config)
    },

    addOwner: (owner) => {
        console.log("userId:", owner)
        var data = new FormData();
        data.append("fullname", owner.fullname);
        data.append("phone", owner.phone);
        data.append("password", owner.password);
        data.append("email", owner.email);
        var config = {
            url: "/userservice/addNewPitchOwner",
            method: "POST",
            data,
            headers: {
                "Authorization": localStorage.getItem("token"),
                ...data.getHeaders,
            },
        };

        return axiosClientPost(config)
    }
}

export default adminApi