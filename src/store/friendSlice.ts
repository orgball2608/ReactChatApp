import { CreateNewFriendRequestParams, FriendRequestType, FriendType } from '../utils/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    acceptFriendRequestReceiveAPI,
    cancelFriendRequestSendAPI,
    getReceiveFriendRequests as getReceiveFriendRequestsAPI,
    rejectFriendRequestReceiveAPI,
    getSendFriendRequests as getSendFriendRequestsAPI,
} from '../services/api';
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

export const getReceiveFriendRequests = createAsyncThunk('friends/receive/fetch/pending', () =>
    getReceiveFriendRequestsAPI(),
);

export const getSendFriendRequests = createAsyncThunk('friends/send/fetch/pending', () => getSendFriendRequestsAPI());

export const postFriendRequest = createAsyncThunk('friends/send/post', ({ email }: CreateNewFriendRequestParams) =>
    postFriendRequestAPI(email),
);

export const acceptFriendRequestReceive = createAsyncThunk('friends/accept/receive', (id: number) =>
    acceptFriendRequestReceiveAPI(id),
);

export const rejectFriendRequestReceive = createAsyncThunk('friends/reject/receive', (id: number) =>
    rejectFriendRequestReceiveAPI(id),
);

export const cancelFriendRequestSend = createAsyncThunk('friends/cancel/send', (id: number) =>
    cancelFriendRequestSendAPI(id),
);

export const getFriends = createAsyncThunk('friends/fetch/friends', () => getFriendsAPI());

const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        friendRequestReceived: (state, action: PayloadAction<FriendRequestType>) => {
            state.receiveRequests.unshift(action.payload);
        },
        friendRequestAccepted: (state, action) => {
            const { friend, friendRequest } = action.payload;
            state.sendRequests = state.sendRequests.filter((request) => request.id !== friendRequest.id);
            state.friends.unshift(friend);
        },
        friendRequestRejected: (state, action: PayloadAction<FriendRequestType>) => {
            const friendRequest = action.payload;
            state.sendRequests = state.sendRequests.filter((request) => request.id !== friendRequest.id);
        },
        friendRequestCancelled: (state, action: PayloadAction<FriendRequestType>) => {
            const friendRequest = action.payload;
            state.receiveRequests = state.receiveRequests.filter((request) => request.id !== friendRequest.id);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getReceiveFriendRequests.fulfilled, (state, action) => {
                state.receiveRequests = action.payload.data;
            })
            .addCase(getFriends.fulfilled, (state, action) => {
                state.friends = action.payload.data;
            })
            .addCase(postFriendRequest.fulfilled, (state, action) => {
                state.sendRequests = [...state.sendRequests, action.payload.data];
            })
            .addCase(acceptFriendRequestReceive.fulfilled, (state, action) => {
                const { friend, friendRequest } = action.payload.data;
                state.receiveRequests = state.receiveRequests.filter((item) => item.id !== friendRequest.id);
                state.friends = [...state.friends, friend];
            })
            .addCase(rejectFriendRequestReceive.fulfilled, (state, action) => {
                state.receiveRequests = state.receiveRequests.filter((item) => item.id !== action.payload.data.id);
            })
            .addCase(cancelFriendRequestSend.fulfilled, (state, action) => {
                state.sendRequests = state.sendRequests.filter((item) => item.id !== action.payload.data.id);
            })
            .addCase(getSendFriendRequests.fulfilled, (state, action) => {
                state.sendRequests = action.payload.data;
            });
    },
});

export const { friendRequestReceived, friendRequestAccepted, friendRequestRejected, friendRequestCancelled } =
    friendsSlice.actions;

export default friendsSlice.reducer;
