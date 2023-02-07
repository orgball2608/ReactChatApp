import axios, { AxiosRequestConfig } from 'axios';
import {
    ChangeGroupOwnerParams,
    Conversation,
    CreateConversationParams,
    CreateGroupMessageParams,
    CreateGroupParams,
    CreateMessageParams,
    CreateUserParams,
    DeleteGroupMessageParams,
    DeleteMessageParams,
    DeleteMessageResponse,
    EditGroupTitleParams,
    EditMessageParams,
    FetchMessagePayload,
    FriendRequestType,
    FriendType,
    Group,
    GroupMessageType,
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

export const editMessage = ({ id, messageId, content }: EditMessageParams) =>
    axiosClient.patch<MessageType>(`/conversations/${id}/messages/${messageId}`, { content }, config);

export const fetchGroups = () => axiosClient.get<Group[]>(`/groups`, config);

export const fetchGroupMessages = (groupId: number) => axiosClient.get(`/groups/${groupId}/messages`, config);

export const postGroupMessage = ({ id, content }: CreateGroupMessageParams) =>
    axiosClient.post(`/groups/${id}/messages`, { content }, config);
export const searchUsers = (query: string) => axiosClient.get(`/user/search?query=${query}`, config);

export const createGroupConversation = (data: CreateGroupParams) => axiosClient.post('/groups', data, config);

export const deleteGroupMessage = ({ groupId, messageId }: DeleteGroupMessageParams) =>
    axiosClient.delete(`/groups/${groupId}/messages/${messageId}`, config);
export const editGroupMessage = ({ id, messageId, content }: EditMessageParams) =>
    axiosClient.patch<GroupMessageType>(`/groups/${id}/messages/${messageId}`, { content }, config);

export const editGroupTitle = ({ id, title }: EditGroupTitleParams) =>
    axiosClient.post(`/groups/${id}`, { title }, config);

export const removeRecipient = (groupId: number, userId: number) =>
    axiosClient.delete(`/groups/${groupId}/recipients/${userId}`, config);

export const changeGroupOwner = ({ groupId, newOwnerId }: ChangeGroupOwnerParams) =>
    axiosClient.patch(`/groups/${groupId}`, { newOwnerId }, config);

export const getReceiveFriendRequests = () => axiosClient.get<FriendRequestType[]>(`/friend-requests/`, config);

export const getSendFriendRequests = () => axiosClient.get<FriendRequestType[]>(`/friend-requests/send`, config);

export const getFriends = () => axiosClient.get<FriendType[]>(`/friends`, config);

export const postFriendRequestAPI = (email: string) => axiosClient.post(`/friend-requests/`, { email }, config);

export const acceptFriendRequestReceiveAPI = (id: number) =>
    axiosClient.post(`/friend-requests/${id}/accept`, {}, config);

export const cancelFriendRequestSendAPI = (id: number) => axiosClient.delete(`/friend-requests/${id}/cancel`, config);

export const rejectFriendRequestReceiveAPI = (id: number) =>
    axiosClient.post(`/friend-requests/${id}/reject`, {}, config);
