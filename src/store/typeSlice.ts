import { ConversationType } from '../utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

export interface TypeSlice {
    type: ConversationType;
}

const initialState: TypeSlice = {
    type: 'private',
};

const typeSlice = createSlice({
    name: 'type',
    initialState,
    reducers: {
        changeType(state, action: PayloadAction<ConversationType>) {
            state.type = action.payload;
        },
    },
});

export const selectType = (state: RootState) => state.type.type;

export const { changeType } = typeSlice.actions;

export default typeSlice.reducer;
