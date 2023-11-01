import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance";

const initialState = {
  hasPass: localStorage.getItem("hasPass") || false,
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data")) || {},
};

// SignUp
export const signup = createAsyncThunk("auth/signUp", async (data) => {
  try {
    const response = axiosInstance.post("/auth/signUp", data);
    toast.promise(response, {
      loading: "Wait! creating your account",
      success: (data) => {
        return data?.data?.msg;
      },
      error: "Failed to create your account",
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
      error: "Failed to login",
    });
    return (await res).data;
  } catch (error) {
    // console.log(error.response)
    toast.error(error?.response?.data?.msg);
    throw error;
  }
});

//Logout
export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = axiosInstance.get("/auth/logout");

    toast.promise(res, {
      loading: "Wait! logout in progress...",
      success: (data) => {
        return data?.data?.msg;
      },
      error: "Failed to logout",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    throw error;
  }
});

//forgot password
export const forgotPassword = createAsyncThunk(
  "/auth/forgot-password",
  async (data) => {
    try {
      const res = axiosInstance.post("/auth/forgot-password", data);

      toast.promise(res, {
        loading: "Wait! Sending Reset Password Link On Your Email...",
        success: (data) => {
          return data?.data?.msg;
        },
        error: "Failed to Send Reset Password Link",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      throw error;
    }
  }
);

//reset password
export const resetPassword = createAsyncThunk(
  "/auth/reset-password",
  async (data) => {
    try {
      const res = axiosInstance.post("/auth/reset-password", data);

      toast.promise(res, {
        loading: "Wait! Reseting Your Password...",
        success: (data) => {
          return data?.data?.msg;
        },
        error: "Failed To Reset Password",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      throw error;
    }
  }
);

//update profile
export const updateProfile = createAsyncThunk(
  "/auth/update-profile",
  async (data) => {
    try {
      const res = axiosInstance.post("/auth/update-profile", data);

      toast.promise(res, {
        loading: "Updating Profile...",
        success: (data) => {
          return data?.data?.msg;
        },
        error: "Failed to Update",
      });
      return (await res).data;
    } catch (error) {
      // console.log(error.response)
      toast.error(error?.response?.data?.msg);
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        localStorage.setItem("hasPass", action?.payload?.user?.hasPass);
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        state.isLoggedIn = true;
        state.role = action?.payload?.user?.role;
        state.data = action?.payload?.user;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.data = {};
        state.isLoggedIn = false;
        state.role = "";
        state.hasPass = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        state.data = action?.payload?.user;
      });
  },
});

// export const {} = authSclice.actions
export default authSlice.reducer;
