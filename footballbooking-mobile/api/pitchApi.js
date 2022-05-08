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
    }
}

export default pitchApi; 