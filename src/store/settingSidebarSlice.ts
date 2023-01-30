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
        },
    },
});

export const { toggleSidebar } = settingSidebarSlice.actions;

export default settingSidebarSlice.reducer;
