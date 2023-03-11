import {
    CreateGroupParams,
    EditGroupTitleParams,
    Group,
    RemoveRecentGroupParams,
    UpdateGroupAvatarParams,
} from '../utils/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    createGroupConversation,
    fetchGroups as fetchGroupsAPI,
    editGroupTitle as editGroupTitleAPI,
    removeRecipient,
    updateGroupAvatarAPI,
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

export const updateGroupAvatar = createAsyncThunk('groups/avatar/update', (params: UpdateGroupAvatarParams) =>
    updateGroupAvatarAPI(params),
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
        updateGroupDeleteMessage: (state, action) => {
            const { groupId, messageId, messages } = action.payload;
            const group = state.groups.find((gm) => gm.id === groupId);
            if (group) {
                group.lastMessageSent.content =
                    group.lastMessageSent.id === messageId ? messages[1].content : group.lastMessageSent.content;
                const index = state.groups.findIndex((gm) => gm.id === groupId);
                state.groups.splice(index, 1);
                state.groups.unshift(group);
            }
        },
        updateGroupAvatarState: (state, action) => {
            const { id } = action.payload;
            const group = state.groups.find((gm) => gm.id === id);
            if (!group) return;
            group.avatar = action.payload.avatar;
            const index = state.groups.findIndex((gm) => gm.id === id);
            state.groups.splice(index, 1);
            state.groups.unshift(group);
        },
        updateGroupRecipientAdd: (state, action) => {
            const { group } = action.payload;
            console.log('updateGroupRecipientAdd');
            const index = state.groups.findIndex((gm) => gm.id === group.id);
            state.groups.splice(index, 1);
            state.groups.unshift(group);
        },
        updateGroupAdded: (state, action) => {
            const { group } = action.payload;
            const index = state.groups.findIndex((gm) => gm.id === group.id);
            if (index >= 0) {
                state.groups.splice(index, 1);
            }
            state.groups.unshift(group);
        },
        changeGroupEmoji: (state, action) => {
            console.log('changeGroupEmoji');
            const { id, emoji } = action.payload;
            const group = state.groups.find((gm) => gm.id === id);
            if (!group) return;
            group.emoji = emoji;
        },
        changeGroupNickName: (state, action) => {
            console.log('changeGroup Nickname');
            const { id, nicknames } = action.payload;
            const group = state.groups.find((gm) => gm.id === id);
            if (!group) return;
            group.nicknames = nicknames;
        },
        leaveGroup: (state, action) => {
            const { savedGroup } = action.payload;
            const index = state.groups.findIndex((gm) => gm.id === savedGroup.id);
            if (index < 0) return;
            state.groups.splice(index, 1);
        },
        removeRecipientWhenLeaveGroup: (state, action) => {
            const { savedGroup, userId } = action.payload;
            const group = state.groups.find((gm) => gm.id === savedGroup.id);
            if (!group) return;
            const index = group.users.findIndex((recipient) => recipient.id === userId);
            if (index < 0) return;
            group.users.splice(index, 1);
        },
        changeGroupTheme: (state, action) => {
            console.log('changeGroupTheme');
            const { id, theme } = action.payload;
            const group = state.groups.find((gm) => gm.id === id);
            if (!group) return;
            group.theme = theme;
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
            })
            .addCase(updateGroupAvatar.fulfilled, (state, action) => {
                console.log(action.payload.data);
            });
    },
});

export const {
    updateGroupConversations,
    addGroupConversations,
    editGroupConversationsTitle,
    deleteGroupConversations,
    updateGroupEditMessage,
    updateGroupDeleteMessage,
    updateGroupAvatarState,
    updateGroupRecipientAdd,
    updateGroupAdded,
    changeGroupEmoji,
    changeGroupNickName,
    leaveGroup,
    removeRecipientWhenLeaveGroup,
    changeGroupTheme
} = groupsSlice.actions;
export default groupsSlice.reducer;
