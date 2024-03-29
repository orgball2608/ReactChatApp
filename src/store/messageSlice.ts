import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    deleteMessage as deleteMessageApi,
    editMessage as editMessageAPI,
    getConversationMessages,
    GetConversationMessageWithLimit,
} from '../services/api';
import {
    ConversationMessage,
    DeleteMessageParams,
    DeleteMessageResponse,
    EditMessageParams,
    GetConversationMessageWithLimitParams,
    MessageEventPayload,
    MessageType,
} from '../utils/types';

export interface MessagesState {
    messages: ConversationMessage[];
}
const initialState: MessagesState = {
    messages: [],
};
export const fetchMessagesThunk = createAsyncThunk('messages/fetch', (conversationId: number) => {
    return getConversationMessages(conversationId);
});

export const deleteMessageThunk = createAsyncThunk('messages/delete', (params: DeleteMessageParams) => {
    return deleteMessageApi(params);
});

export const editMessageThunk = createAsyncThunk('messages/edit', (params: EditMessageParams) => {
    return editMessageAPI(params);
});

export const loadMoreMessagesThunk = createAsyncThunk(
    'messages/loadMore',
    ({ id, limit, offset }: GetConversationMessageWithLimitParams) => {
        return GetConversationMessageWithLimit({
            id,
            limit,
            offset,
        });
    },
);

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<MessageEventPayload>) => {
            const { conversation, message } = action.payload;
            const conversationMessage = state.messages.find((cm) => cm.id === conversation.id);
            conversationMessage?.messages.unshift(message);
        },
        deleteMessage: (state, action: PayloadAction<DeleteMessageResponse>) => {
            console.log('Inside deleteMessage reducer');
            const { payload } = action;
            const conversationMessages = state.messages.find((cm) => cm.id === payload.conversationId);
            if (!conversationMessages) return;
            const messageIndex = conversationMessages.messages.findIndex((m) => m.id === payload.messageId);
            conversationMessages.messages[messageIndex].deletedAt = new Date();
        },
        editMessage: (state, action) => {
            console.log('Inside Update Message reducer');
            const { conversation, id, content } = action.payload;
            const conversationMessage = state.messages.find((cm) => cm.id === conversation.id);
            if (!conversationMessage) return;
            const messageIndex = conversationMessage.messages.findIndex((message) => message.id === id);
            conversationMessage.messages[messageIndex].content = content;
        },
        reactMessage: (state, action) => {
            console.log('Inside reactMessage reducer');
            const { conversation, message } = action.payload;
            const conversationMessage = state.messages.find((cm) => cm.id === conversation.id);
            if (!conversationMessage) return;
            const messageIndex = conversationMessage.messages.findIndex((m) => m.id === message.id);
            conversationMessage.messages[messageIndex] = message;
        },
        resetMessages: (state) => {
            state.messages = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
                const { id } = action.payload.data;
                const index = state.messages.findIndex((cm) => cm.id === id);
                const exists = state.messages.find((cm) => cm.id === id);
                if (exists) {
                    state.messages[index] = action.payload.data;
                } else {
                    state.messages.push(action.payload.data);
                }
            })
            .addCase(deleteMessageThunk.fulfilled, (state, action) => {
                const { conversationId, messageId } = action.payload.data;
                const conversationMessages = state.messages.find((cm) => cm.id === conversationId);
                if (!conversationMessages) return;
                const messageIndex = conversationMessages.messages.findIndex((m) => m.id === messageId);
                conversationMessages.messages[messageIndex].deletedAt = new Date();
            })
            .addCase(editMessageThunk.fulfilled, (state, action) => {
                const {
                    conversation: { id: conversationId },
                    id: messageId,
                    content,
                } = action.payload.data;
                const conversationMessages = state.messages.find((cm) => cm.id === conversationId);
                if (!conversationMessages) return;
                const messageIndex = conversationMessages.messages.findIndex((message) => message.id === messageId);
                if (messageIndex > -1) conversationMessages.messages[messageIndex].content = content;
            })
            .addCase(loadMoreMessagesThunk.fulfilled, (state, action) => {
                const { messages, id } = action.payload.data;
                const conversationMessages = state.messages.find((cm) => cm.id === id);
                if (!conversationMessages) {
                    state.messages.push(action.payload.data);
                    return;
                }
                messages.forEach((message: MessageType) => {
                    if (!conversationMessages.messages.find((m) => m.id === message.id)) {
                        conversationMessages.messages.push(message);
                    }
                });
            });
    },
});
export const { addMessage, deleteMessage, editMessage, reactMessage, resetMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
