import { ConversationTypeData, SelectedPageTypeData } from './types';

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
