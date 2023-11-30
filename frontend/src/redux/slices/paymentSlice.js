import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance";

const initialState = {
  hasPass: localStorage.getItem("hasPass") || false,
};

// create order
export const createOrder = createAsyncThunk("payment/create-order", async (data) => {
  try {
    const response = axiosInstance.post("payment/create-order", data);
    toast.promise(response, {
      loading: "Loading...",
      success: (data) => {
        return data?.data?.msg;
      },
      error: "Failed to Load Payment",
    });

    return (await response).data;
  } catch (error) {
    throw error.message; // Handle and return a specific error message
  }
});

// verify payment
export const verifyPayment = createAsyncThunk("payment/verify", async (data) => {
  try {
    const response = axiosInstance.post("payment/verify", data);
    toast.promise(response, {
      loading: "Loading...",
      success: (data) => {
        return data?.data?.msg;
      },
      error: "Payment Failed",
    });

    return (await response).data;
  } catch (error) {
    throw error.message; // Handle and return a specific error message
  }
});

const paymentSlice = createSlice({
    name:"payment",
    initialState,
    reducers: {},
    extraReducers : (builder)=>{
        builder.addCase(verifyPayment.fulfilled, ()=>{
            localStorage.setItem("hasPass", true);
        })
    }
})

// export const {} = paymentSlice.actions
export default paymentSlice.reducer