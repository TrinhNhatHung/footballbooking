import axios from "axios";
import axiosClient from "./axiosClient";
import axiosClientPost from "./axiosClientPost";
import queryString from 'query-string';


const pitchApi = {
    getAll: (params) => {
        const url = 'pitchservice/pitchs';
        return axiosClient.get(url, { params });
    },

    get: (id) => {
        const url = `pitchservice/pitch/${id}`;
        return axiosClient.get(url);
    },

    getFreeTimeSlot: (params) => {
        const url = 'bookingservice/getFreeTimeSlot';
        return axiosClient.get(url, { params: params });
    },

    getMiniPitchById: (id) => {
        const url = 'pitchservice/miniPitchByIdList';
        return axiosClient.get(url, { params: id });
    },

    booking: (params) => {
        var data = new FormData();
        data.append("bookingDate", params.bookingDate);
        data.append("miniPitchId", params.miniPitchId);
        data.append("hourStart", params.hourStart);
        var config = {
            url: "/bookingservice/book",
            method: "POST",
            data,
            headers: {
                "Authorization": localStorage.getItem("token"),
                ...data.getHeaders,
            },
        };

        return axiosClientPost(config)

    },

    bookingInfor: () => {
        var data = new FormData();
        var config = {
            url: "/bookingservice/getMyBooking",
            method: "GET",
            data,
            headers: {
                "Authorization": localStorage.getItem("token"),
                ...data.getHeaders,
            },
        };

        return axiosClientPost(config)
    },

    cancelBooking: (bookingId) => {
        var data = new FormData();
        data.append("bookingId", bookingId);
        var config = {
            url: "/bookingservice/cancelBookingRequest",
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

export default pitchApi; 