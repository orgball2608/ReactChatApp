import { CreateNewFriendRequestParams, FriendRequestType, FriendType } from '../utils/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFriendRequests as getFriendRequestsAPI } from '../services/api';
import { getFriends as getFriendsAPI, postFriendRequestAPI } from '../services/api';

export interface FriendState {
    receiveRequests: FriendRequestType[];
    sendRequests: FriendRequestType[];
    friends: FriendType[];
}

const initialState: FriendState = {
    receiveRequests: [],
    sendRequests: [],
    friends: [],
};

export const getFriendRequests = createAsyncThunk('friends/fetch/pending', () => getFriendRequestsAPI());

export const postFriendRequest = createAsyncThunk('friends/post', ({ email }: CreateNewFriendRequestParams) =>
    postFriendRequestAPI(email),
);

export const getFriends = createAsyncThunk('friends/fetch/friends', () => getFriendsAPI());

const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFriendRequests.fulfilled, (state, action) => {
                state.receiveRequests = action.payload.data;
            })
            .addCase(getFriends.fulfilled, (state, action) => {
                state.friends = action.payload.data;
            })
            .addCase(postFriendRequest.fulfilled, (state, action) => {
                console.log(action.payload.data);
                state.sendRequests = [...state.sendRequests, action.payload.data];
            });
    },
});

export const {} = friendsSlice.actions;

export default friendsSlice.reducer;
