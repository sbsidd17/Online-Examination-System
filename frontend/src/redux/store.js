import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import examSlice from "./slices/examSlice";
import instructorSlice from "./slices/instructorSlice";
import testSlice from "./slices/testSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    exam: examSlice,
    test: testSlice,
    instructor: instructorSlice,
  },
});
