import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance";

const initialState = {
  test: {
    testData : {},
    testResult : {},
    questionData:{}
  },
};

export const getQuestionData = createAsyncThunk("/exam/get-question-data/", async (id) => {
  try {
      const response = axiosInstance.get(`/exam/get-question-data/${id}`);
      toast.promise(response, {
        loading: "Wait! Loading Question Data",
        success: (data) => {
          return data?.data?.msg;
        },
        error: "Failed to load Question",
      })
      // console.log(await response)
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      throw error.message; // Handle and return a specific error message
    }
  });

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
        toast.error(error?.response?.data?.msg)
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
    .addCase(getQuestionData.fulfilled, (state, action)=>{
      state.test.questionData = action.payload.questionData
    })
  },
});

export const {testResult} = testSlice.actions

export default testSlice.reducer;
