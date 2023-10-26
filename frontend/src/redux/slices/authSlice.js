import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import toast from "react-hot-toast"
import axiosInstance from "../../config/axiosInstance";

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "",
    data: JSON.parse(localStorage.getItem("data")) || {}
}

// SignUp
export const signup = createAsyncThunk("auth/signUp", async (data) => {
    try {
        const response = axiosInstance.post("/auth/signUp", data);
        toast.promise(response, {
            loading: 'Wait! creating your account',
            success: (data) => {
                return data?.data?.msg;
            },
            error: 'Failed to create your account'
        });
        
        return await response.data;
    } catch (error) {
        throw error.message; // Handle and return a specific error message
    }
});


//Login
export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        const res = axiosInstance.post("auth/login", data);
        
        toast.promise(res, {
            loading: "Wait! authentication in progress...",
            success: (data) => {
                return data?.data?.msg;
            },
            error: "Failed to log in"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});

const authSlice = createSlice({
    name : "userData",
    initialState, 
    reducers : {
        
    }
})

// export const {} = authSclice.actions
export default authSlice.reducer