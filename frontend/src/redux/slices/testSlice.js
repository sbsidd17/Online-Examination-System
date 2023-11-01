import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance";

const initialState = {
  test: {
    testData : {},
    testResult : {}
  },
};

export const getTestData = createAsyncThunk("/exam/get-test-data", async (id) => {
    try {
        const response = axiosInstance.get(`/exam/get-test-data/${id}`);
        toast.promise(response, {
          loading: "Wait! Loading Test",
          success: (data) => {
            return data?.data?.msg;
          },
          error: "Failed to load test",
        })
        // console.log(await response)
        return (await response).data;
      } catch (error) {
        throw error.message; // Handle and return a specific error message
      }
    });

const testSlice = createSlice({
  name: "testSlice",
  initialState,
  reducers: {
    testResult : (state, action)=>{
        state.test.testResult = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getTestData.fulfilled, (state, action)=>{
        // console.log(action.payload.testData)
        state.test.testData = action.payload.testData
    })
  },
});

export const {testResult} = testSlice.actions

export default testSlice.reducer;
