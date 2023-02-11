import { ArrowCycle, ChatDots, Crown, Gear, Person, PersonCross, Ribbon } from 'akar-icons';
import { Conversation, SelectedPageType, User, UserContextMenuItemType } from './types';

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
