import { ArrowCycle, ChatDots, Crown, Gear, Person, PersonCross, Ribbon } from 'akar-icons';
import { Conversation, FriendType, SelectedPageType, User, UserContextMenuItemType } from './types';

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
            return { icon: PersonCross };
        case 'transfer_owner':
            return { icon: Crown };
        case 'profile':
            return { icon: Person };
        case 'message':
            return { icon: ChatDots };
        default:
            return { icon: PersonCross };
    }
};

export const getFullName = (user: User | undefined, conversation: Conversation | undefined) =>
    user?.id !== conversation?.creator.id
        ? `${conversation?.creator.lastName} ${conversation?.creator.firstName}`
        : `${conversation?.recipient.lastName} ${conversation?.recipient.firstName}`;

export const getDisplayName = (user: User) => {
    if (user.firstName && user.lastName) {
        return `${user.firstName} ${user.lastName}`;
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
    return user.id === conversation.creator.id ? conversation.recipient : conversation.creator;
};

export const searchConversation = (searchText: string, conversations: Conversation[], user: User) => {
    return conversations.filter((conversation: Conversation) => {
        const fullName = `${getRecipient(conversation, user).firstName} ${getRecipient(conversation, user).lastName}`;
        return fullName.toLowerCase().includes(searchText.toLowerCase());
    });
};
