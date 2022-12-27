import { ConversationType } from '../utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ConversationsState {
    conversations: ConversationType[];
}

const initialState: ConversationsState = {
    conversations: [],
};

const conversationsSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {
        addConversation: (state, action: PayloadAction<ConversationType>) => {
            console.log('addConversation');
            state.conversations.push(action.payload);
        },
    },
});

export const { addConversation } = conversationsSlice.actions;

export default conversationsSlice.reducer;
