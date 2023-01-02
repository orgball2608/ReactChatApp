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

export type ConversationType = {
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
    conversation: ConversationType;
};

export type MessageEventPayload = {
    conversation: ConversationType;
    message: MessageType;
};

export type CreateMessageParams = {
    content: string;
    conversationId: number;
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
