import { createSlice } from "@reduxjs/toolkit";
import { VisibilityFilters } from "../constant/cFilter";

const initialState = {
  filter: VisibilityFilters.SHOW_ALL,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      const filter = action.payload;
      state.filter = filter;
    },
  },
});

export const { updateFilter } = filterSlice.actions;
export default filterSlice.reducer;
