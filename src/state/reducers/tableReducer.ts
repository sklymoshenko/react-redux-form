import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface ITableItem {
  name: string;
  height: number;
  file: string;
}

interface TableState {
  items: ITableItem[];
}

// Define the initial state using that type
const initialState: TableState = {
  items: []
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<ITableItem[]>) => {
      state.items = action.payload.sort((a, b) => a.name.localeCompare(b.name));
    }
  }
});

export const { setItems } = tableSlice.actions;

export const selectItems = (state: RootState) => state.table.items;

export default tableSlice.reducer;
