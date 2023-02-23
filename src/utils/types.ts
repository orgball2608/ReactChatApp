export type CreateUserParams = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
};

export type UserCredentialsParams = {
    email: string;
    password: string;
};

export type ProfileType = {
    id: number;
    avatar: string;
    banner: string;
    bio: string;
    location: string;
};

export type User = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    profile: ProfileType;
};

export type Conversation = {
    id: number;
    creator: User;
    recipient: User;
    createdAt: Date;
    lastMessageSent: MessageType;
    lastMessageSentAt: Date;
    emoji: string;
};

export type AttachmentType = {
    key: string;
    type: string;
    name: string;
    size: number;
};

export type MessageType = {
    id: number;
    content: string;
    createdAt: Date;
    author: User;
    conversation: Conversation;
    attachments: AttachmentType[];
    reacts: ReactionMessageType[];
    gif: string;
    sticker: string;
    reply: MessageType;
    deletedAt: Date;
};

export type MessageEventPayload = {
    conversation: Conversation;
    message: MessageType;
};

export type CreateMessageFromParams = {
    content: string;
    attachments: File[];
};

export type CreateMessageParams = {
    id: number;
    data: FormData;
};

export type CreateConversationParams = {
    email: string;

    message: string;
};

export type FetchMessagePayload = {
    id: number;
    messages: MessageType[];
};

export type ConversationMessage = {
    id: number;
    messages: MessageType[];
};

export type DeleteMessageParams = {
    conversationId: number;
    messageId: number;
};

export type DeleteMessageResponse = {
    conversationId: number;
    messageId: number;
};

export type EditMessageParams = {
    id: number;
    messageId: number;
    content: string;
};

export type ConversationType = 'private' | 'group';

export type ConversationTypeData = {
    type: ConversationType;
    label: string;
};

export type Group = {
    id: number;
    title?: string;
    users: User[];
    owner: User;
    creator: User;
    messages: GroupMessageType[];
    createdAt: Date;
    lastMessageSent: MessageType;
    lastMessageSentAt: Date;
    avatar?: string;
    emoji: string;
};

export type GroupMessageType = {
    id: number;
    content: string;
    author: User;
    createdAt: Date;
    group: Group;
    attachments: AttachmentType[];
    reacts: ReactionMessageType[];
    gif: string;
    sticker: string;
    reply: GroupMessageType;
    deletedAt: Date;
};

export type GroupMessage = {
    id: number;
    messages: GroupMessageType[];
};

export type CreateGroupMessageParams = {
    id: number;
    data: FormData;
};

export type GroupMessageEventPayload = {
    group: Group;
    message: MessageType;
};

export type CreateGroupParams = {
    users: string[];
    title: string;
};

export type DeleteGroupMessageParams = {
    groupId: number;
    messageId: number;
};

export type DeleteGroupMessageResponse = {
    groupId: number;
    messageId: number;
};

export type EditGroupTitleParams = {
    id: number;
    title: string | undefined;
};

export type SelectedPageType = 'setting' | 'async' | 'archire' | 'friend' | 'conversations';

export type SelectedPageTypeData = {
    page: SelectedPageType;
    action: string;
};

export type UserContextMenuItemType = 'kick' | 'transfer_owner' | 'profile' | 'message';

export type ContextMenuItemType = {
    label: string;
    action: UserContextMenuItemType;
    ownerOnly: boolean;
    onClick?: () => void;
};

export type RemoveRecentGroupParams = {
    groupId: number;
    userId: number;
};

export type ChangeGroupOwnerParams = {
    groupId: number;
    newOwnerId: number;
};

export type FriendRequestType = {
    id: number;
    sender: User;
    status: 'pending' | 'accepted' | 'rejected';
    receiver: User;
    createdAt: string;
};

export type FriendType = {
    id: number;
    sender: User;
    receiver: User;
    createdAt: string;
};

export type CreateNewFriendRequestParams = {
    email: string;
};

export type DeleteFriendPayload = {
    userId: number;
    friend: FriendType;
};

export type UpdateGroupAvatarParams = {
    id: number;
    avatar: File;
};

export type AddGroupRecipientsParams = {
    groupId: number;
    emails: string[];
};

export type ReactionMessageType = {
    id: number;
    type: string;
    message: MessageType;
    author: User;
};

export type DeleteReactionMessageParams = {
    messageId: number;
    reactionId: number;
    id: number;
};

export type CreateGifMessageParams = {
    id: number;
    gif: string;
};

export type CreateStickerMessageParams = {
    id: number;
    sticker: string;
};

export type StickerCollection = {
    name: string;
    thumbnail: string;
    icon: string;
    id: string;
    stickers: {
        id: string;
        spriteURL: string;
    }[];
};

export type CreateReplyMessageParams = {
    id: number;
    content: string;
    messageId: number;
};

export type ChangeEmojiIconParams = {
    id: number;
    emoji: string;
};
