import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CallType, User } from '../utils/types';
import { DataConnection, MediaConnection, Peer } from 'peerjs';

export interface GroupCallState {
    isGroupCalling: boolean;
    isGroupCallInProgress: boolean;
    initiator?: User;
    groupPeer?: Peer;
    groupCalls?: MediaConnection[];
    connections?: DataConnection[];
    groupCallType?: CallType;
    groupLocalStream?: MediaStream;
    groupRemoteStreams: MediaStream[];
    activeGroupId?: number;
    participants: User[];
    isReceivingGroupCall: boolean;
}

const initialState: GroupCallState = {
    isGroupCalling: false,
    isGroupCallInProgress: false,
    initiator: undefined,
    groupCalls: [],
    groupCallType: undefined,
    groupLocalStream: undefined,
    groupRemoteStreams: [],
    activeGroupId: undefined,
    participants: [],
    isReceivingGroupCall: false,
    connections: [],
};

const groupCallSlice = createSlice({
    name: 'groupCall',
    initialState,
    reducers: {
        startGroupCall(state, action: PayloadAction<{ participants: User[]; callType: CallType }>) {
            state.isGroupCalling = true;
            state.isGroupCallInProgress = false;
            state.participants = action.payload.participants;
            state.groupCallType = action.payload.callType;
        },
        setInitiator(state, action: PayloadAction<User>) {
            state.initiator = action.payload;
        },
        setGroupPeer(state, action: PayloadAction<Peer>) {
            console.log(action.payload);
            state.groupPeer = action.payload;
        },
        addGroupCall(state, action: PayloadAction<MediaConnection>) {
            state.groupCalls?.push(action.payload);
        },
        removeGroupCall(state, action: PayloadAction<string>) {
            state.groupCalls && state.groupCalls.filter((call) => call.peer !== action.payload);
        },
        setGroupCallInProgress(state, action: PayloadAction<boolean>) {
            state.isGroupCallInProgress = action.payload;
        },
        setGroupLocalStream(state, action: PayloadAction<MediaStream>) {
            state.groupLocalStream = action.payload;
        },
        addGroupRemoteStream(state, action: PayloadAction<MediaStream>) {
            if (state.groupRemoteStreams.includes(action.payload)) return;
            state.groupRemoteStreams = [...state.groupRemoteStreams, action.payload];
        },
        setGroupRemoteStreams(state, action: PayloadAction<MediaStream[]>) {
            state.groupRemoteStreams = action.payload;
        },
        setIsReceivingGroupCall: (state, action: PayloadAction<boolean>) => {
            state.isReceivingGroupCall = action.payload;
        },
        removeGroupRemoteStream(state, action: PayloadAction<string>) {
            state.groupRemoteStreams = state.groupRemoteStreams.filter((stream) => stream.id !== action.payload);
        },
        setActiveGroupId(state, action: PayloadAction<number>) {
            state.activeGroupId = action.payload;
        },
        setGroupCallType: (state, action: PayloadAction<CallType>) => {
            state.groupCallType = action.payload;
        },
        endGroupCall(state) {
            state.isGroupCalling = false;
            state.isGroupCallInProgress = false;
            state.initiator = undefined;
            state.groupCalls = [];
            state.groupCallType = undefined;
            state.groupLocalStream = undefined;
            state.groupRemoteStreams = [];
            state.activeGroupId = undefined;
            state.participants = [];
            state.isReceivingGroupCall = false;
            state.connections = [];
        },
        setParticipants(state, action: PayloadAction<User[]>) {
            state.participants = action.payload;
        },
        removeParticipants(state, action: PayloadAction<number>) {
            state.participants = state.participants.filter((user) => user.id !== action.payload);
        },
        addConnection: (state, action: PayloadAction<DataConnection>) => {
            state.connections?.push(action.payload);
        },
    },
});

export const {
    startGroupCall,
    setInitiator,
    setGroupPeer,
    addGroupCall,
    setGroupCallInProgress,
    setGroupLocalStream,
    addGroupRemoteStream,
    removeGroupRemoteStream,
    setActiveGroupId,
    endGroupCall,
    setGroupCallType,
    setIsReceivingGroupCall,
    setParticipants,
    removeGroupCall,
    addConnection,
    removeParticipants,
    setGroupRemoteStreams,
} = groupCallSlice.actions;

export default groupCallSlice.reducer;
