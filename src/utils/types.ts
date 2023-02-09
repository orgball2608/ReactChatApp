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
    createdAt: string;
    lastMessageSent: MessageType;
};

export type MessageType = {
    id: number;
    content: string;
    createdAt: string;
    author: User;
    conversation: Conversation;
};

export type MessageEventPayload = {
    conversation: Conversation;
    message: MessageType;
};

export type CreateMessageParams = {
    id: number;
    content: string;
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
    createdAt: number;
    lastMessageSent: MessageType;
    lastMessageSentAt: Date;
};

export type GroupMessageType = {
    id: number;
    content: string;
    author: User;
    createdAt: string;
    group: Group;
};

export type GroupMessage = {
    id: number;
    messages: GroupMessageType[];
};

export type CreateGroupMessageParams = {
    id: number;
    content: string;
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

export type UserContextMenuItemType = 'kick' | 'transfer_owner' | 'profile';

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
