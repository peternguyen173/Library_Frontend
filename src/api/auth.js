import axios from 'axios';
import Cookies from "js-cookie";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/auth',
})

export const signIn = async (email, password) => {
        const response = await instance.post('/login', {email, password})
        console.log("res1")
        return response.data;
}

export const signInAdmin = async (email, password) => {
    const response = await instance.post('/admin/login', {email, password})
    console.log("res1")
    return response.data;
}

export const signUp = async (userRequest) => {
    try {
        // Sending POST request to signup endpoint
        const response = await instance.post('/signup', userRequest);
        // Handling successful signup and returning the response data
        return response.data;
    } catch (error) {
        // Log and handle errors
        console.error("Signup failed:", error.response?.data || error.message);
        throw error; // Rethrow the error to handle it in the calling code
    }
};