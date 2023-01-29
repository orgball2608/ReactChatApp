import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    deleteGroupMessage as deleteGroupMessageAPI,
    fetchGroupMessages as fetchGroupMessagesAPI,
} from '../services/api';
import { DeleteGroupMessageParams, DeleteGroupMessageResponse, GroupMessage } from '../utils/types';

export interface GroupMessagesState {
    messages: GroupMessage[];
}
const initialState: GroupMessagesState = {
    messages: [],
};
export const fetchGroupMessagesThunk = createAsyncThunk('groupMessages/fetch', (id: number) =>
    fetchGroupMessagesAPI(id),
);

export const deleteGroupMessageThunk = createAsyncThunk('groupMessages/delete', (params: DeleteGroupMessageParams) =>
    deleteGroupMessageAPI(params),
);
export const groupMessagesSlice = createSlice({
    name: 'groupMessages',
    initialState,
    reducers: {
        addGroupMessage: (state, action) => {
            const { group, message } = action.payload;
            const groupMessage = state.messages.find((gm) => gm.id === group.id);
            groupMessage?.messages.unshift(message);
        },
        deleteGroupMessage: (state, action: PayloadAction<DeleteGroupMessageResponse>) => {
            console.log('Inside delete GroupMessage reducer');
            const { groupId, messageId } = action.payload;
            const groupMessages = state.messages.find((cm) => cm.id === groupId);
            if (!groupMessages) return;
            const messageIndex = groupMessages.messages.findIndex((m) => m.id === messageId);
            groupMessages.messages.splice(messageIndex, 1);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGroupMessagesThunk.fulfilled, (state, action) => {
                const { id } = action.payload.data;
                const index = state.messages.findIndex((gm) => gm.id === id);
                const exists = state.messages.find((gm) => gm.id === id);
                exists ? (state.messages[index] = action.payload.data) : state.messages.push(action.payload.data);
            })
            .addCase(deleteGroupMessageThunk.fulfilled, (state, action) => {
                const { groupId, messageId } = action.payload.data;
                const groupMessages = state.messages.find((gm) => gm.id === groupId);
                if (!groupMessages) return;
                const index = groupMessages.messages.findIndex((message) => message.id === messageId);
                groupMessages.messages.splice(index, 1);
            });
    },
});

export const { addGroupMessage, deleteGroupMessage } = groupMessagesSlice.actions;

export default groupMessagesSlice.reducer;
