import { SelectedPageType } from '../utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SeletedPageSlice {
    page: SelectedPageType;
}

const initialState: SeletedPageSlice = {
    page: 'chat',
};

const seletedPageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        changePage(state, action: PayloadAction<SelectedPageType>) {
            state.page = action.payload;
        },
    },
});

export const { changePage } = seletedPageSlice.actions;

export default seletedPageSlice.reducer;
