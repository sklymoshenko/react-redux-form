import { configureStore } from "@reduxjs/toolkit";
import { reducer as formReducer } from "redux-form";
import tableReducer from "./reducers/tableReducer";

export const store = configureStore({
  reducer: {
    form: formReducer,
    table: tableReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
