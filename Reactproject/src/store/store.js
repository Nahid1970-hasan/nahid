import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "../features/page/page_slice";
import userReducer from "../features/user/user_slice";



export const store = configureStore({
  reducer: {
    user: userReducer,
    page: pageReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
