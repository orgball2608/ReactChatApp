import { ArrowCycle, ChatDots, Crown, Gear, Person, Ribbon } from 'akar-icons';
import { Conversation, FriendType, Group, SelectedPageType, User, UserContextMenuItemType } from './types';
import moment from 'moment';
import { BsFillPersonFill, BsMessenger } from 'react-icons/bs';
import { BiMessageRoundedMinus } from 'react-icons/bi';
import { defaultAvatar } from './constants';

export const getRecipientFromConversation = (conversation?: Conversation, user?: User) => {
    return user?.id === conversation?.creator.id ? conversation?.recipient : conversation?.creator;
};

export const getUserSideBarIcon = (page: SelectedPageType) => {
    switch (page) {
        case 'conversations':
            return { icon: ChatDots };
        case 'friend':
            return { icon: Person };
        case 'archire':
            return { icon: Ribbon };
        case 'async':
            return { icon: ArrowCycle };
        case 'setting':
            return { icon: Gear };
        default:
            return { icon: ChatDots };
    }
};

export const getUserContextMenuIcon = (type: UserContextMenuItemType) => {
    switch (type) {
        case 'kick':
            return { icon: BiMessageRoundedMinus };
        case 'transfer_owner':
            return { icon: Crown };
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
        ? `${conversation?.creator.lastName} ${conversation?.creator.firstName}`
        : `${conversation?.recipient.lastName} ${conversation?.recipient.firstName}`;

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
