import { Group } from '../utils/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchGroups as fetchGroupsAPI } from '../services/api';

export interface GroupState {
    groups: Group[];
}
const initialState: GroupState = {
    groups: [],
};

export const fetchGroupsThunk = createAsyncThunk('groups/fetch', () => {
    return fetchGroupsAPI();
});

const groupsSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        updateGroupConversations: (state, action: PayloadAction<Group>) => {
            const group = action.payload;
            const index = state.groups.findIndex((gm) => gm.id === group.id);
            state.groups.splice(index, 1);
            state.groups.unshift(group);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGroupsThunk.fulfilled, (state, action) => {
            state.groups = action.payload.data;
        });
    },
});

export const { updateGroupConversations } = groupsSlice.actions;
export default groupsSlice.reducer;
