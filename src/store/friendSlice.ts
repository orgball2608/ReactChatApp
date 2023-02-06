import { FriendRequestType, FriendType } from '../utils/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFriendRequests as getFriendRequestsAPI } from '../services/api';
import { getFriends as getFriendsAPI } from '../services/api';

export interface FriendState {
    requests: FriendRequestType[];
    friends: FriendType[];
}

const initialState: FriendState = {
    requests: [],
    friends: [],
};

export const getFriendRequests = createAsyncThunk('friends/fetch/pending', () => getFriendRequestsAPI());

export const getFriends = createAsyncThunk('friends/fetch/friends', () => getFriendsAPI());

const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFriendRequests.fulfilled, (state, action) => {
                state.requests = action.payload.data;
            })
            .addCase(getFriends.fulfilled, (state, action) => {
                state.friends = action.payload.data;
            });
    },
});

export const {} = friendsSlice.actions;

export default friendsSlice.reducer;
