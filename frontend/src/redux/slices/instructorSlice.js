import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance";

const initialState = {
  instructorExams: [],
};

export const getExamsByInstructor = createAsyncThunk(
  "/get-exam-by-instructor",
  async (instructor_id) => {
    try {
      const response = axiosInstance.get(
        `/exam/get-exam-by-instructor/${instructor_id}`
      );
      // toast.promise(response, {
      //   loading: "Wait! Loading Exam",
      //   success: (data) => {
      //     return data?.data?.msg;
      //   },
      //   error: "Failed to load exam",
      // });
      // console.log(await response);
      const rsp = await response;
      return rsp.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      throw error.message; // Handle and return a specific error message
    }
  }
);

export const createExam = createAsyncThunk(
  "/exam/create-exam",
  async (data) => {
    try {
      const response = axiosInstance.post(`/exam/create-exam`, data);
      toast.promise(response, {
        loading: "Wait! Creating Exam",
        success: (data) => {
          return data?.data?.msg;
        },
        error: "Failed to create exam",
      });
      const rsp = await response;
      return rsp.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      throw error.message; // Handle and return a specific error message
    }
  }
);

export const editExam = createAsyncThunk("/exam/edit-exam", async (data) => {
  try {
    const response = axiosInstance.post(`/exam/edit-exam`, data);
    toast.promise(response, {
      loading: "Wait! Saving Exam",
      success: (data) => {
        return data?.data?.msg;
      },
      error: "Failed to edit exam",
    });
    console.log(await response);
    const rsp = await response;
    return rsp.data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    throw error.message; // Handle and return a specific error message
  }
});

export const deleteExam = createAsyncThunk(
  "/exam/delete-exam",
  async (data) => {
    try {
      const response = axiosInstance.post(`/exam/delete-exam`, data);
      toast.promise(response, {
        loading: "Wait! Deleting Exam",
        success: (data) => {
          return data?.data?.msg;
        },
        error: "Failed to delete exam",
      });
      console.log(await response);
      const rsp = await response;
      return rsp.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      throw error.message; // Handle and return a specific error message
    }
  }
);

export const createTest = createAsyncThunk(
  "/exam/create-test",
  async (data) => {
    try {
      const response = axiosInstance.post(`/exam/create-test`, data);
      toast.promise(response, {
        loading: "Wait! Creating Test",
        success: (data) => {
          return data?.data?.msg;
        },
        error: "Failed to create test",
      });
      // console.log(await response)
      const rsp = await response;
      return rsp.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      throw error.message; // Handle and return a specific error message
    }
  }
);

export const editTest = createAsyncThunk("/exam/edit-test", async (data) => {
  try {
    console.log(data);
    const response = axiosInstance.post(`/exam/edit-test`, data);
    toast.promise(response, {
      loading: "Wait! Saving Test",
      success: (data) => {
        return data?.data?.msg;
      },
      error: "Failed to edit test",
    });
    // console.log(await response)
    const rsp = await response;
    return rsp.data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    throw error.message; // Handle and return a specific error message
  }
});

export const deleteTest = createAsyncThunk(
  "/exam/delete-exam",
  async (data) => {
    try {
      const response = axiosInstance.post(`/exam/delete-test`, data);
      toast.promise(response, {
        loading: "Wait! Deleting Test",
        success: (data) => {
          return data?.data?.msg;
        },
        error: "Failed to delete test",
      });
      // console.log(await response)
      const rsp = await response;
      return rsp.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      throw error.message; // Handle and return a specific error message
    }
  }
);

export const createQuestion = createAsyncThunk(
  "/exam/create-question",
  async (data) => {
    try {
      const response = axiosInstance.post(`/exam/create-question`, data);
      toast.promise(response, {
        loading: "Wait! Creating Question",
        success: (data) => {
          return data?.data?.msg;
        },
        error: "Failed to create question",
      });
      // console.log(await response)
      const rsp = await response;
      return rsp.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      throw error.message; // Handle and return a specific error message
    }
  }
);

export const editQuestion = createAsyncThunk(
  "/exam/edit-question",
  async (data) => {
    try {
      const response = axiosInstance.get(`/exam/edit-question`, data);
      toast.promise(response, {
        loading: "Wait! Saving Question",
        success: (data) => {
          return data?.data?.msg;
        },
        error: "Failed to edit test",
      });
      // console.log(await response)
      const rsp = await response;
      return rsp.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      throw error.message; // Handle and return a specific error message
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  "/exam/delete-question",
  async (data) => {
    try {
      const response = axiosInstance.post(`/exam/delete-question`, data);
      toast.promise(response, {
        loading: "Wait! Deleting Question",
        success: (data) => {
          return data?.data?.msg;
        },
        error: "Failed to delete question",
      });
      // console.log(await response)
      const rsp = await response;
      return rsp.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      throw error.message; // Handle and return a specific error message
    }
  }
);

export const createOption = createAsyncThunk(
  "/exam/create-test",
  async (data) => {
    try {
      const response = axiosInstance.post(`/exam/create-option`, data);
      toast.promise(response, {
        loading: "Wait! Creating Option",
        success: (data) => {
          return data?.data?.msg;
        },
        error: "Failed to create option",
      });
      // console.log(await response)
      const rsp = await response;
      return rsp.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      throw error.message; // Handle and return a specific error message
    }
  }
);

export const editOption = createAsyncThunk(
  "/exam/edit-option",
  async (data) => {
    try {
      const response = axiosInstance.get(`/exam/edit-option`, data);
      toast.promise(response, {
        loading: "Wait! Saving option",
        success: (data) => {
          return data?.data?.msg;
        },
        error: "Failed to edit option",
      });
      // console.log(await response)
      const rsp = await response;
      return rsp.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      throw error.message; // Handle and return a specific error message
    }
  }
);

export const deleteOption = createAsyncThunk(
  "/exam/delete-option",
  async (data) => {
    try {
      const response = axiosInstance.get(`/exam/delete-option`, data);
      toast.promise(response, {
        loading: "Wait! Deleting Option",
        success: (data) => {
          return data?.data?.msg;
        },
        error: "Failed to delete option",
      });
      // console.log(await response)
      const rsp = await response;
      return rsp.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      throw error.message; // Handle and return a specific error message
    }
  }
);

export const createAnswer = createAsyncThunk(
  "/exam/create-answer",
  async (data) => {
    try {
      const response = axiosInstance.post(`/exam/create-answer`, data);
      toast.promise(response, {
        loading: "Wait! Creating Option",
        success: (data) => {
          return data?.data?.msg;
        },
        error: "Failed to Save Answer",
      });
      // console.log(await response)
      const rsp = await response;
      return rsp.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      throw error.message; // Handle and return a specific error message
    }
  }
);

export const editAnswer = createAsyncThunk(
  "/exam/edit-answer",
  async (data) => {
    try {
      const response = axiosInstance.get(`/exam/edit-answer`, data);
      toast.promise(response, {
        loading: "Wait! Saving Answer",
        success: (data) => {
          return data?.data?.msg;
        },
        error: "Failed to edit answer",
      });
      // console.log(await response)
      const rsp = await response;
      return rsp.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      throw error.message; // Handle and return a specific error message
    }
  }
);

export const deleteAnswer = createAsyncThunk(
  "/exam/delete-answer",
  async (data) => {
    try {
      const response = axiosInstance.get(`/exam/delete-answer`, data);
      toast.promise(response, {
        loading: "Wait! Deleting Answer",
        success: (data) => {
          return data?.data?.msg;
        },
        error: "Failed to delete answer",
      });
      // console.log(await response)
      const rsp = await response;
      return rsp.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      throw error.message; // Handle and return a specific error message
    }
  }
);

const instructorSlice = createSlice({
  name: "instructorSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExamsByInstructor.fulfilled, (state, action) => {
      // console.log(action.payload.allExams)
      state.instructorExams = action.payload.allExams;
    });
  },
});

// export const {  } = instructorSlice.actions;

export default instructorSlice.reducer;
