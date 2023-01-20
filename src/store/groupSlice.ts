import { Group } from '../utils/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchGroupsThunk.fulfilled, (state, action) => {
            state.groups = action.payload.data;
        });
    },
});

export const {} = groupsSlice.actions;
export default groupsSlice.reducer;
