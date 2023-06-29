import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userAuthAPI } from "../services/userAuthAPI";
import authSlice from "../features/authSlice";
import userSlice from "../features/userSlice";
import { todoAPI } from "../services/todoAPIs";

export const store = configureStore({
  reducer: {
    [userAuthAPI.reducerPath]: userAuthAPI.reducer,
    [todoAPI.reducerPath]: todoAPI.reducer,
    auth: authSlice,
    user: userSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthAPI.middleware, todoAPI.middleware),
});

setupListeners(store.dispatch);
