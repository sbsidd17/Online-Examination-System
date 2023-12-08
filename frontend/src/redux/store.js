import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./slices/adminSlice";
import authSlice from "./slices/authSlice";
import examSlice from "./slices/examSlice";
import instructorSlice from "./slices/instructorSlice";
import paymentSlice from "./slices/paymentSlice";
import testSlice from "./slices/testSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    exam: examSlice,
    test: testSlice,
    instructor: instructorSlice,
    payment: paymentSlice,
    admin: adminSlice
  },
});
