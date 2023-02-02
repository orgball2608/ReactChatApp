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
        type: 'chat',
        label: 'Chat',
    },
    {
        type: 'friend',
        label: 'Friend',
    },
    {
        type: 'archire',
        label: 'Archire',
    },
    {
        type: 'async',
        label: 'Async',
    },
    {
        type: 'setting',
        label: 'Setting',
    },
];
