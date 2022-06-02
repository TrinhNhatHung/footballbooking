import axios from "axios";
import axiosClient from "./axiosClient";
import axiosClientPost from "./axiosClientPost";
import queryString from 'query-string';


const adminApi = {
    getListUsers: (filter) => {
        var data = new FormData();
        data.append("searchByNameOrPhone", filter.searchByNameOrPhone);
        data.append("limit", filter.limit);
        data.append("roleId", filter.roleId);
        data.append("page", filter.page);
        console.log("FILTER")
        console.log(filter)
        var config = {
            url: "/userservice/getAllUser",
            method: "POST",

            headers: {
                "Authorization": localStorage.getItem("token"),
                ...data.getHeaders,
            },
            data,
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