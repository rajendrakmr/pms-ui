import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    items: []
};
const breadcrumbSlice = createSlice({
    name: "breadcrumbs",
    initialState,
    reducers: {
        setBreadcrumbs(state, action) {
            state.items = action.payload;
        },
        clearBreadcrumbs(state) {
            state.items = [];
        }
    }
});
export const { setBreadcrumbs, clearBreadcrumbs } = breadcrumbSlice.actions;
export default breadcrumbSlice.reducer;
