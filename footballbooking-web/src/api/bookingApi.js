import axiosClientPost from "./axiosClientPost";


const bookingApi = {
    getRequestList: () => {
        var data = new FormData();
        var config = {
            url: "/bookingservice/getRequestBookingList",
            method: "GET",
            data,
            headers: {
                "Authorization": localStorage.getItem("token"),
                ...data.getHeaders,
            },
        };

        return axiosClientPost(config)
    },
}

export default bookingApi;