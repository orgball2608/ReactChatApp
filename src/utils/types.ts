import selectedPageSlice from '../store/selectedPageSlice';

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

export type User = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
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
