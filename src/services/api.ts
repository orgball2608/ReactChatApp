import axios, { AxiosRequestConfig } from 'axios';
import {
    Conversation,
    CreateConversationParams,
    CreateGroupMessageParams,
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

const axiosClient = axios.create({
    baseURL: API_URL,
});

export const postRegisterUser = (data: CreateUserParams) => axiosClient.post(`/auth/register`, data, config);

export const postLoginUser = (data: UserCredentialsParams) => axiosClient.post(`/auth/login`, data, config);

export const getAuthUser = () => axiosClient.get<User>(`/auth/status`, config);

export const getConversations = () => axiosClient.get<Conversation[]>(`/conversations`, config);

export const postNewConversation = (data: CreateConversationParams) =>
    axiosClient.post<Conversation>(`/conversations`, data, config);
export const getConversationMessages = (conversationId: number) =>
    axiosClient.get<FetchMessagePayload>(`/conversations/${conversationId}/messages`, config);
export const postNewMessage = ({ id, content }: CreateMessageParams) =>
    axiosClient.post(`/conversations/${id}/messages`, { content }, config);

export const deleteMessage = ({ conversationId, messageId }: DeleteMessageParams) =>
    axiosClient.delete<DeleteMessageResponse>(`/conversations/${conversationId}/messages/${messageId}`, config);

export const editMessage = ({ conversationId, messageId, content }: EditMessageParams) =>
    axiosClient.patch<MessageType>(`/conversations/${conversationId}/messages/${messageId}`, { content }, config);

export const fetchGroups = () => axiosClient.get<Group[]>(`/groups`, config);

export const fetchGroupMessages = (groupId: number) => axiosClient.get(`/groups/${groupId}/messages`, config);

export const postGroupMessage = ({ id, content }: CreateGroupMessageParams) =>
    axiosClient.post(`/groups/${id}/messages`, { content }, config);
