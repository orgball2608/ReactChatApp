import { ContextMenuItemType, ConversationTypeData, SelectedPageTypeData } from './types';

export const ConversationTypes: ConversationTypeData[] = [
    {
        type: 'private',
        label: 'Direct Messages',
    },
    {
        type: 'group',
        label: 'Group Chats',
    },
];

export const SelectedPageTypes: SelectedPageTypeData[] = [
    {
        page: 'conversations',
        action: 'Chat',
    },
    {
        page: 'friend',
        action: 'Friend',
    },
    {
        page: 'archire',
        action: 'Archire',
    },
    {
        page: 'async',
        action: 'Async',
    },
    {
        page: 'setting',
        action: 'Setting',
    },
];

export const userContextMenuItems: ContextMenuItemType[] = [
    {
        label: 'Kick User',
        action: 'kick',
        ownerOnly: true,
    },
    {
        label: 'Transfer Owner',
        action: 'transfer_owner',
        ownerOnly: true,
    },
    {
        label: 'Proifle',
        action: 'profile',
        ownerOnly: false,
    },
    {
        label: 'Message',
        action: 'message',
        ownerOnly: false,
    },
];

export const CDN_URL = 'https://nest-chat-app.s3.ap-southeast-1.amazonaws.com/';
export const CDN_ORIGINAL_URL = 'https://nest-chat-app.s3.ap-southeast-1.amazonaws.com/orginal/';
export const CDN_PREVIEW_URL = 'https://nest-chat-app.s3.ap-southeast-1.amazonaws.com/preview/';
