import {
    Conversation,
    FriendType,
    Group,
    GroupMessageType,
    MessageType,
    SelectedPageType,
    User,
    UserContextMenuItemType,
} from './types';
import moment from 'moment';
import { BsFillPersonFill, BsMessenger } from 'react-icons/bs';
import { defaultAvatar } from './constants';
import { RiVipCrown2Fill } from 'react-icons/ri';
import { FaUserMinus } from 'react-icons/fa';
import LeaveGroupIcon from '../components/icons/LeaveGroupIcon';
import SettingIcon from '../components/icons/SettingIcon';
import ChatIcon from '../components/icons/ChatIcon';
import FriendIcon from '../components/icons/FriendIcon';
import ArchiveIcon from '../components/icons/ArchiveIcon';
import CallIcon from '../components/icons/CallIcon';

export const getRecipientFromConversation = (conversation?: Conversation, user?: User) => {
    return user?.id === conversation?.creator.id ? conversation?.recipient : conversation?.creator;
};

export const getUserSideBarIcon = (page: SelectedPageType) => {
    switch (page) {
        case 'conversations':
            return { icon: ChatIcon };
        case 'friends':
            return { icon: FriendIcon };
        case 'archives':
            return { icon: ArchiveIcon };
        case 'settings':
            return { icon: SettingIcon };
        case 'calls':
            return { icon: CallIcon };
        default:
            return { icon: SettingIcon };
    }
};

export const getUserSettingIcon = (action: string) => {
    switch (action) {
        case 'setting':
            return { icon: SettingIcon };
        case 'logout':
            return { icon: LeaveGroupIcon };
        default:
            return { icon: SettingIcon };
    }
};

export const getUserContextMenuIcon = (type: UserContextMenuItemType) => {
    switch (type) {
        case 'kick':
            return { icon: FaUserMinus };
        case 'transfer_owner':
            return { icon: RiVipCrown2Fill };
        case 'profile':
            return { icon: BsFillPersonFill };
        case 'message':
            return { icon: BsMessenger };
        default:
            return { icon: BsMessenger };
    }
};

export const getFullName = (user: User | undefined, conversation: Conversation | undefined) =>
    user?.id !== conversation?.creator.id
        ? `${conversation?.creator.firstName}${conversation?.creator.lastName}`
        : `${conversation?.recipient.firstName}${conversation?.recipient.lastName}`;

export const getDisplayName = (user: User) => {
    if (user && user.firstName && user.lastName) {
        return `${user.firstName} ${user.lastName}`;
    } else {
        return 'Unknown User';
    }
};

export const getFriend = (friend: FriendType, user: User) => {
    return friend.sender.id === user.id ? friend.receiver : friend.sender;
};

export const getFriends = (friends: FriendType[], user: User) => {
    return friends.map((friend: FriendType) => getFriend(friend, user));
};

export const searchFriends = (searchText: string, friends: FriendType[], user: User) => {
    return friends.filter((friend: FriendType) => {
        const fullName = `${getFriend(friend, user).firstName} ${getFriend(friend, user).lastName}`;
        return fullName.toLowerCase().includes(searchText.toLowerCase());
    });
};

export const getRecipient = (conversation: Conversation, user: User) => {
    return user.id === conversation?.creator.id ? conversation?.recipient : conversation?.creator;
};

export const searchConversation = (searchText: string, conversations: Conversation[], user: User) => {
    return conversations.filter((conversation: Conversation) => {
        const fullName = `${getRecipient(conversation, user).firstName} ${getRecipient(conversation, user).lastName}`;
        return fullName.toLowerCase().includes(searchText.toLowerCase());
    });
};

export const formatDate = (date: Date) => {
    if (moment(date).isSame(moment(), 'day')) {
        return moment(date).format('H:mm A');
    }

    if (moment(date).isSame(moment(), 'week')) {
        return moment(date).format('dddd H:mm A');
    }
    return moment(date).format('DD/MM/YYYY H:mm A');
};

export const lastMessageContent = (conversation: Group | Conversation) => {
    const { lastMessageSent } = conversation;
    const MAX_MESSAGE_LENGTH = 15;
    if (lastMessageSent) {
        if (
            lastMessageSent.content === '' ||
            (lastMessageSent.attachments && lastMessageSent.attachments?.length > 0)
        ) {
            return `Just sent ${
                lastMessageSent.attachments?.length > 1 ? `${lastMessageSent.attachments.length}` : 'a'
            } photo`;
        } else if (lastMessageSent?.gif) {
            return `Just sent a gif`;
        } else if (lastMessageSent?.sticker) {
            return `Just sent a sticker`;
        }
        return lastMessageSent.content?.length > MAX_MESSAGE_LENGTH
            ? lastMessageSent.content.slice(0, MAX_MESSAGE_LENGTH).concat('...')
            : lastMessageSent.content;
    }
    return null;
};

export const getFileSize = (size: number) => {
    const fileSize = size / 1024;
    if (fileSize < 1024) {
        return `${fileSize.toFixed(2)} KB`;
    }
    return `${(fileSize / 1024).toFixed(2)} MB`;
};

export const getAvatar = (user: User) => {
    if (!user?.profile || !user?.profile.avatar) return defaultAvatar;
    return user.profile.avatar;
};

export const getLastSeenMessage = (messages: MessageType[] | GroupMessageType[], user: User) => {
    let lastSeenMessage = null;
    messages.slice().reverse().forEach((message) => {
        if (message.messageStatuses && message.messageStatuses.length > 0) {
            message.messageStatuses.forEach((status) => {
                if (status.user.id === user?.id) {
                    lastSeenMessage = message;
                }
            });
        }
    });
    return lastSeenMessage;
};




