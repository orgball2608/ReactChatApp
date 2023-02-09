import { CreateGroupParams, EditGroupTitleParams, Group, RemoveRecentGroupParams } from '../utils/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    createGroupConversation,
    fetchGroups as fetchGroupsAPI,
    editGroupTitle as editGroupTitleAPI,
    removeRecipient,
} from '../services/api';

export interface GroupState {
    groups: Group[];
}
const initialState: GroupState = {
    groups: [],
};

export const fetchGroupsThunk = createAsyncThunk('groups/fetch', () => {
    return fetchGroupsAPI();
});

export const createGroupThunk = createAsyncThunk('groups/create', (params: CreateGroupParams) => {
    return createGroupConversation(params);
});

export const editGroupTitleThunk = createAsyncThunk('groups/title/edit', (params: EditGroupTitleParams) =>
    editGroupTitleAPI(params),
);

export const removeRecentGroupThunk = createAsyncThunk(
    'groups/recipients/remove',
    ({ groupId, userId }: RemoveRecentGroupParams) => removeRecipient(groupId, userId),
);

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
        addGroupConversations: (state, action: PayloadAction<Group>) => {
            const group = action.payload;
            state.groups.unshift(group);
        },
        editGroupConversationsTitle: (state, action: PayloadAction<Group>) => {
            const group = action.payload;
            const index = state.groups.findIndex((gm) => gm.id === group.id);
            state.groups.splice(index, 1);
            state.groups.unshift(group);
        },
        deleteGroupConversations: (state, action: PayloadAction<Group>) => {
            const group = action.payload;
            const index = state.groups.findIndex((gm) => gm.id === group.id);
            state.groups.splice(index, 1);
        },
        updateGroupEditMessage: (state, action) => {
            const { id, messageId, content } = action.payload;
            const group = state.groups.find((gm) => gm.id === id);
            if (!group) return;
            group.lastMessageSent.content =
                group.lastMessageSent.id === messageId ? content : group.lastMessageSent.content;
            const index = state.groups.findIndex((gm) => gm.id === id);
            state.groups.splice(index, 1);
            state.groups.unshift(group);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGroupsThunk.fulfilled, (state, action) => {
                state.groups = action.payload.data;
            })
            .addCase(createGroupThunk.fulfilled, (state, action) => {
                console.log(action.payload.data);
            })
            .addCase(editGroupTitleThunk.fulfilled, (state, action) => {
                const { id } = action.payload.data;
                const index = state.groups.findIndex((group) => group.id === id);
                if (index < 0) return;
                state.groups.splice(index, 1);
                state.groups.unshift(action.payload.data);
            });
    },
});

export const {
    updateGroupConversations,
    addGroupConversations,
    editGroupConversationsTitle,
    deleteGroupConversations,
    updateGroupEditMessage,
} = groupsSlice.actions;
export default groupsSlice.reducer;
