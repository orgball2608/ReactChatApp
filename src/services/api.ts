import axios, { AxiosRequestConfig } from 'axios';
import {
    Conversation,
    CreateConversationParams,
    CreateMessageParams,
    CreateUserParams,
    DeleteMessageParams,
    DeleteMessageResponse,
    EditMessageParams,
    FetchMessagePayload,
    Group,
    MessageType,
    User,
    UserCredentialsParams,
} from '../utils/types';

const API_URL = process.env.REACT_APP_API_URL;
const config: AxiosRequestConfig = { withCredentials: true };

export const postRegisterUser = (data: CreateUserParams) => axios.post(`${API_URL}/auth/register`, data, config);

export const postLoginUser = (data: UserCredentialsParams) => axios.post(`${API_URL}/auth/login`, data, config);

export const getAuthUser = () => axios.get<User>(`${API_URL}/auth/status`, config);

export const getConversations = () => axios.get<Conversation[]>(`${API_URL}/conversations`, config);

export const postNewConversation = (data: CreateConversationParams) =>
    axios.post<Conversation>(`${API_URL}/conversations`, data, config);
export const getConversationMessages = (conversationId: number) =>
    axios.get<FetchMessagePayload>(`${API_URL}/conversations/${conversationId}/messages`, config);
export const postNewMessage = (data: CreateMessageParams, conversationId: number) =>
    axios.post(`${API_URL}/conversations/${conversationId}/messages`, data, config);

export const deleteMessage = ({ conversationId, messageId }: DeleteMessageParams) =>
    axios.delete<DeleteMessageResponse>(`${API_URL}/conversations/${conversationId}/messages/${messageId}`, config);

export const editMessage = ({ conversationId, messageId, content }: EditMessageParams) =>
    axios.patch<MessageType>(`${API_URL}/conversations/${conversationId}/messages/${messageId}`, { content }, config);

export const fetchGroups = () => axios.get<Group[]>(`${API_URL}/groups`, config);
