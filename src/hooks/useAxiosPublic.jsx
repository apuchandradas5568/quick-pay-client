import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://quick-pay-server.onrender.com/api/v1/',
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;