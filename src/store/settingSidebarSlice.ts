import { createSlice } from '@reduxjs/toolkit';

export interface SettingSidebarState {
    showSidebar: boolean;
}

export const initialState: SettingSidebarState = {
    showSidebar: true,
};

export const settingSidebarSlice = createSlice({
    name: 'settingSidebar',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.showSidebar = !state.showSidebar;
        }, hiddenSideBar(state) {
            state.showSidebar = false;
        },
    },
});

export const { toggleSidebar, hiddenSideBar } = settingSidebarSlice.actions;

export default settingSidebarSlice.reducer;
