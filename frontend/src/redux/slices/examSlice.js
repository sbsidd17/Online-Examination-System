import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance";

const initialState = {
  categories: {
    allCategories: [],
    curr_category: {},
  },
  exams: {
    allExams: [],
    curr_exam: {},
  },
};

export const createCategory = createAsyncThunk(
  "/exam/create-category",
  async (data) => {
    try {
      const response = axiosInstance.post("/exam/create-category", data);
      toast.promise(response, {
        loading: "Wait! Creating Category",
        success: (data) => {
          return data?.data?.msg;
        },
        error: "Failed to Create",
      });

      const rsp = await response;
      return rsp.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      throw error.message; // Handle and return a specific error message
    }
  }
);

export const getAllCategory = createAsyncThunk(
  "/exam/all-categories",
  async () => {
    const response = await axiosInstance.get("/exam/all-categories");
    return response.data;
  }
);

export const getCategoryById = createAsyncThunk(
  "/exam/get-category",
  async (id) => {
    const response = await axiosInstance.get(`/exam/get-category/${id}`);
    return response.data;
  }
);

export const updateCategory = createAsyncThunk(
  "/exam/edit-category",
  async (data) => {
    try {
      const response = axiosInstance.post("/exam/edit-category", data);
      toast.promise(response, {
        loading: "Wait! Saving Data",
        success: (data) => {
          return data?.data?.msg;
        },
        error: "Failed to create your account",
      });

      const rsp = await response;
      return rsp.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      throw error.message; // Handle and return a specific error message
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "exam/delete-category",
  async (data) => {
    try {
      const response = axiosInstance.post("exam/delete-category", data);
      toast.promise(response, {
        loading: "Wait!  Deleting...",
        success: (data) => {
          return data?.data?.msg;
        },
        error: "Failed to Delete",
      });
      const rsp = await response.data;
      return rsp;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      throw error.message; // Handle and return a specific error message
    }
  }
);

export const getAllExams = createAsyncThunk("/exam/all-exams", async () => {
  const response = await axiosInstance.get("/exam/all-exams");
  return response.data;
});

export const getExamById = createAsyncThunk(
  "/exam/get-exam-data",
  async (id) => {
    const response = await axiosInstance.get(`/exam/get-exam-data/${id}`);
    return response.data;
  }
);

const examSlice = createSlice({
  name: "examData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.categories.allCategories = action.payload.allCategory;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.categories.curr_category = action.payload.category;
      })
      .addCase(getAllExams.fulfilled, (state, action) => {
        state.exams.allExams = action.payload.allExams;
      })
      .addCase(getExamById.fulfilled, (state, action) => {
        state.exams.curr_exam = action.payload.examData;
      });
  },
});

// export const {} = examSlice.actions
export default examSlice.reducer;
