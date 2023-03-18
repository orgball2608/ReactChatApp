import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Conversation, CreateConversationParams } from '../utils/types';
import { getConversations, postNewConversation } from '../services/api';

export interface ConversationsState {
    conversations: Conversation[];
}

const initialState: ConversationsState = {
    conversations: [],
};

export const fetchConversationsThunk = createAsyncThunk('conversations/fetch', async () => {
    return getConversations();
});

export const createConversationThunk = createAsyncThunk(
    'conversations/create',
    async (data: CreateConversationParams) => {
        return postNewConversation(data);
    },
);

export const conversationsSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {
        addConversation: (state, action: PayloadAction<Conversation>) => {
            console.log('addConversation');
        },
        updateConversation: (state, action: PayloadAction<Conversation>) => {
            const conversation = action.payload;
            const index = state.conversations.findIndex((c) => c.id === conversation.id);
            state.conversations.splice(index, 1);
            state.conversations.unshift(conversation);
        },
        updateEditMessage: (state, action) => {
            const { id, messageId, content } = action.payload;
            const conversation = state.conversations.find((c) => c.id === id);
            if (conversation) {
                conversation.lastMessageSent.content =
                    conversation.lastMessageSent.id === messageId ? content : conversation.lastMessageSent.content;

                const index = state.conversations.findIndex((c) => c.id === id);
                state.conversations.splice(index, 1);
                state.conversations.unshift(conversation);
            }
        },
        updateDeleteMessage: (state, action) => {
            const { conversationId, messageId, selectedMessage } = action.payload;
            const conversation = state.conversations.find((c) => c.id === conversationId);
            const index = state.conversations.findIndex((c) => c.id === conversationId);
            if (conversation) {
                if (conversation.lastMessageSent.id === messageId) {
                    state.conversations[index].lastMessageSent = selectedMessage.messages[1];
                }
                state.conversations.splice(index, 1);
                state.conversations.unshift(conversation);
            }
        },
        updateDeleteMessageEvent: (state, action) => {
            const { conversationId, messageId, conversation: conversationResponse } = action.payload;
            const conversation = state.conversations.find((c) => c.id === conversationId);
            const index = state.conversations.findIndex((c) => c.id === conversationId);
            if (conversation) {
                if (conversation.lastMessageSent.id === messageId) {
                    state.conversations[index].lastMessageSent = conversationResponse.lastMessageSent;
                }
                state.conversations.splice(index, 1);
                state.conversations.unshift(conversationResponse);
            }
        },
        changeConversationEmoji: (state, action) => {
            const { id, emoji } = action.payload;
            const conversation = state.conversations.find((c) => c.id === id);
            if (conversation) {
                conversation.emoji = emoji;
            }
        },
        changeConversationNickname: (state, action) => {
            const { id, nicknames } = action.payload;
            const conversation = state.conversations.find((c) => c.id === id);
            if (conversation) {
                conversation.nicknames = nicknames;
            }
        }, changeConversationTheme: (state, action) => {
            const { id, theme } = action.payload;
            const conversation = state.conversations.find((c) => c.id === id);
            if (conversation) {
                conversation.theme = theme;
            }
        },
        updateLastMessageSeen: (state, action) => {
            const { conversation, message } = action.payload;
            const conversationState = state.conversations.find((c) => c.id === conversation.id);
            if (!conversationState) return;
            if (message.id === conversationState.lastMessageSent.id) {
                conversationState.lastMessageSent = message;
                conversationState.lastMessageSentAt = message.createdAt;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConversationsThunk.fulfilled, (state, action) => {
                state.conversations = action.payload.data;
            })
            .addCase(createConversationThunk.fulfilled, (state, action) => {
                state.conversations.unshift(action.payload.data);
            });
    },
});

// Action creators are generated for each case reducer function
export const {
    addConversation,
    updateConversation,
    updateEditMessage,
    updateDeleteMessage,
    updateDeleteMessageEvent,
    changeConversationEmoji,
    changeConversationNickname,
    changeConversationTheme,
    updateLastMessageSeen,
} = conversationsSlice.actions;
export default conversationsSlice.reducer;
