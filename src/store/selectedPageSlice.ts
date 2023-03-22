import { SelectedPageType } from '../utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SelectedPageSlice {
    page: SelectedPageType;
}

const initialState: SelectedPageSlice = {
    page: 'conversations',
};

const selectedPageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        changePage(state, action: PayloadAction<SelectedPageType>) {
            state.page = action.payload;
        },
    },
});

export const { changePage } = selectedPageSlice.actions;

export default selectedPageSlice.reducer;
