import axiosClient from "./axiosClient";



export const getCurrentUserInfo = async (token) => {
    const response = await axiosClient.get('/users/profile');
    return response.data;
};