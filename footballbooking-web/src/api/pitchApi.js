import axiosClient from "./axiosClient";

const pitchApi = {
    getAll: (params) => {
        const url = 'pitchservice/pitchs';
        return axiosClient.get(url, { params });
    },

    get: (id) => {
        const url = `/pitchs/${id}`;
        return axiosClient.get(url);
    },
}

export default pitchApi; 