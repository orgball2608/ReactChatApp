import { ContextMenuItemType, ConversationTypeData, SelectedPageTypeData } from './types';
import defaultAvatarSrc from '../__assets__/default_avatar.jpg';
import defaultGroupAvatarSrc from '../__assets__/groupAvatar.png';

export const ConversationTypes: ConversationTypeData[] = [
    {
        type: 'private',
        label: 'Private',
    },
    {
        type: 'group',
        label: 'Groups',
    },
];

export const SelectedPageTypes: SelectedPageTypeData[] = [
    {
        page: 'conversations',
        action: 'Chat',
    },
    {
        page: 'friends',
        action: 'Friend',
    },
    {
        page: 'archives',
        action: 'Archive',
    },
    {
        page: 'calls',
        action: 'Call',
    },
    {
        page: 'settings',
        action: 'Setting',
    },

];

export const userContextMenuItems: ContextMenuItemType[] = [
    {
        label: 'Profile',
        action: 'profile',
        ownerOnly: false,
    },
    {
        label: 'Message',
        action: 'message',
        ownerOnly: false,
    },
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
];

export const CDN_URL = 'https://nest-chat-app.s3.ap-southeast-1.amazonaws.com/';
export const CDN_ORIGINAL_URL = 'https://nest-chat-app.s3.ap-southeast-1.amazonaws.com/orginal/';
export const CDN_PREVIEW_URL = 'https://nest-chat-app.s3.ap-southeast-1.amazonaws.com/preview/';

export const REACTIONS_UI: {
    [key: string]: {
        icon: string;
        gif: string;
    };
} = {
    like: {
        icon: '/reactions-icon/like.svg',
        gif: '/reactions/like.gif',
    },
    love: {
        icon: '/reactions-icon/love.svg',
        gif: '/reactions/love.gif',
    },
    care: {
        icon: '/reactions-icon/care.svg',
        gif: '/reactions/care.gif',
    },
    haha: {
        icon: '/reactions-icon/haha.svg',
        gif: '/reactions/haha.gif',
    },
    wow: {
        icon: '/reactions-icon/wow.svg',
        gif: '/reactions/wow.gif',
    },
    sad: {
        icon: '/reactions-icon/sad.svg',
        gif: '/reactions/sad.gif',
    },
    angry: {
        icon: '/reactions-icon/angry.svg',
        gif: '/reactions/angry.gif',
    },
};

export const defaultAvatar = defaultAvatarSrc;

export const defaultGroupAvatar = defaultGroupAvatarSrc;

export const EMOJI_REPLACEMENT = {
    '😭': ['ToT', 'T-T', 'T_T', 'T.T', ':((', ':-(('],
    '😓': ['\'-_-'],
    '😜': [';p', ';-p', ';P', ';-P'],
    '😑': ['-_-'],
    '😢': [':\'(', ':\'-('],
    '😞': [':(', ':-(', '=(', ')=', ':['],
    '😐': [':|', ':-|'],
    '😛': [':P', ':-P', ':p', ':-p', '=P', '=p'],
    '😁': [':D', ':-D', '=D', ':d', ':-d', '=d'],
    '😗': [':*', ':-*'],
    '😇': ['O:)', 'O:-)'],
    '😳': ['O_O', 'o_o', '0_0'],
    '😊': ['^_^', '^~^', '=)'],
    '😠': ['>:(', '>:-(', '>:o', '>:-o', '>:O', '>:-O'],
    '😎': ['8)', 'B)', '8-)', 'B-)', ':))'],
    '😚': ['-3-'],
    '😉': [';)', ';-)'],
    '😲': [':O', ':o', ':-O', ':-o'],
    '😣': ['>_<', '>.<'],
    '😘': [';*', ';-*'],
    '😕': [':/', ':-/', ':\\', ':-\\', '=/', '=\\'],
    '🙂': [':)', ':]', ':-)', '(:', '(='],
    '💗': ['<3'],
    '😂': [':\')'],
    '🤑': ['$-)'],
};

export const STICKERS_URL = 'https://cdn.jsdelivr.net/gh/naptestdev/zalo-stickers/data/favourite.json';

export const THEMES = [
    '#0D90F3',
    '#EB3A2A',
    '#0AD4EB',
    '#643ECB',
    '#93BF34',
    '#E84FCF',
    '#B43F3F',
    '#E6A50A',
    '#69C90C',
];

export const UserOptions = [
    {
        label: 'Setting',
        action: 'setting',
    },
    {
        label: 'Logout',
        action: 'logout',
    },
];

export enum CallEvents {
    VIDEO_CALL_INITIATE = 'onVideoCallCreated',
    VOICE_CALL_INITIATE = 'onVoiceCallInitiate',
    VIDEO_CALL_ACCEPT = 'videoCallAccepted',
    VOICE_CALL_ACCEPT = 'voiceCallAccepted',
    VIDEO_CALL_REJECT = 'videoCallRejected',
    VOICE_CALL_REJECT = 'voiceCallRejected',
    VIDEO_CALL_HANG_UP = 'videoCallHangUp',
    VOICE_CALL_HANG_UP = 'voiceCallHangUp',
}

export enum WebsocketEvents {
    VOICE_CALL_ACCEPTED = 'onVoiceCallAccepted',
    VIDEO_CALL_ACCEPTED = 'onVideoCallAccept',
    VOICE_CALL_HANG_UP = 'onVoiceCallHangUp',
    VIDEO_CALL_HANG_UP = 'onVideoCallHangUp',
    VOICE_CALL_REJECTED = 'onVoiceCallRejected',
    VIDEO_CALL_REJECTED = 'onVideoCallRejected',
    VOICE_CALL = 'onVoiceCall',
    VIDEO_CALL = 'onVideoCall',
}