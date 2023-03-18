import axios, { AxiosRequestConfig } from 'axios';
import { STICKERS_URL } from '../utils/constants';
import {
    AddGroupRecipientsParams,
    ChangeConversationNickNameParams,
    ChangeConversationThemeParams,
    ChangeEmojiIconParams,
    ChangeGroupOwnerParams,
    Conversation,
    CreateConversationParams,
    CreateGifMessageParams,
    CreateGroupMessageParams,
    CreateGroupParams,
    CreateMessageParams,
    CreateReplyMessageParams,
    CreateStickerMessageParams,
    CreateUserParams,
    DeleteGroupMessageParams,
    DeleteMessageParams,
    DeleteMessageResponse,
    DeleteReactionMessageParams,
    EditGroupTitleParams,
    EditMessageParams,
    FetchMessagePayload,
    ForwardMessageParams,
    FriendRequestType,
    FriendType,
    GetConversationMessageWithLimitParams,
    Group,
    GroupMessageType,
    MessageType,
    UpdateGroupAvatarParams,
    UpdateSeenMessageParams,
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

export const postNewMessage = ({ id, data }: CreateMessageParams) =>
    axiosClient.post(`/conversations/${id}/messages`, data, config);

export const deleteMessage = ({ conversationId, messageId }: DeleteMessageParams) =>
    axiosClient.delete<DeleteMessageResponse>(`/conversations/${conversationId}/messages/${messageId}`, config);

export const editMessage = ({ id, messageId, content }: EditMessageParams) =>
    axiosClient.patch<MessageType>(`/conversations/${id}/messages/${messageId}`, { content }, config);

export const fetchGroups = () => axiosClient.get<Group[]>(`/groups`, config);

export const fetchGroupMessages = (groupId: number) => axiosClient.get(`/groups/${groupId}/messages`, config);

export const postGroupMessage = ({ id, data }: CreateGroupMessageParams) =>
    axiosClient.post(`/groups/${id}/messages`, data, config);

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

export const getProfileById = (id: number) => axiosClient.get(`/user-profile/${id}`, config);

export const deleteFriendAPI = (id: number) => axiosClient.delete(`/friends/${id}`, config);

export const getUserById = (id: number) => axiosClient.get(`/user/${id}`, config);

export const getFriendRequestByUserId = (id: number) => axiosClient.get(`/friend-requests/user/${id}`, config);

export const updateGroupAvatarAPI = ({ id, avatar }: UpdateGroupAvatarParams) => {
    const formData = new FormData();
    formData.append('avatar', avatar);
    return axiosClient.patch<Group>(`/groups/${id}/avatar`, formData, config);
};

export const addGroupRecipientsAPI = ({ groupId, emails }: AddGroupRecipientsParams) =>
    axiosClient.post(`/groups/${groupId}/recipients/recipients`, { emails }, config);

export const logoutUser = () => axiosClient.post(`/auth/logout`, {}, config);

export const reactionMessageAPI = (conversationId: number, messageId: number, reaction: string) =>
    axiosClient.post(`conversations/${conversationId}/messages/${messageId}/reacts`, { type: reaction }, config);

export const reactionGroupMessageAPI = (groupId: number, messageId: number, reaction: string) =>
    axiosClient.post(`groups/${groupId}/messages/${messageId}/reacts`, { type: reaction }, config);

export const deleteReactionMessageAPI = ({ id, messageId, reactionId }: DeleteReactionMessageParams) =>
    axiosClient.delete(`conversations/${id}/messages/${messageId}/reacts/${reactionId}/remove`, config);

export const deleteReactionGroupMessageAPI = ({ id, messageId, reactionId }: DeleteReactionMessageParams) =>
    axiosClient.delete(`groups/${id}/messages/${messageId}/reacts/${reactionId}/remove`, config);

export const getTrendingGiphy = () =>
    axiosClient.get(
        `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=30&rating=g`,
    );

export const searchGiphy = (query: string) =>
    axiosClient.get(
        `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${query}&limit=15`,
    );

export const CreateGifMessageAPI = ({ id, gif }: CreateGifMessageParams) =>
    axiosClient.post(`/conversations/${id}/messages/gif`, { gif }, config);

export const CreateStickerMessageAPI = ({ id, sticker }: CreateStickerMessageParams) =>
    axiosClient.post(`/conversations/${id}/messages/sticker`, { sticker }, config);

export const CreateGroupGifMessageAPI = ({ id, gif }: CreateGifMessageParams) =>
    axiosClient.post(`/groups/${id}/messages/gif`, { gif }, config);

export const CreateGroupStickerMessageAPI = ({ id, sticker }: CreateStickerMessageParams) =>
    axiosClient.post(`/groups/${id}/messages/sticker`, { sticker }, config);

export const GetStickers = () => axios.get(`${STICKERS_URL}`);

export const CreateReplyMessageAPI = ({ id, content, messageId }: CreateReplyMessageParams) =>
    axiosClient.post(`/conversations/${id}/messages/${messageId}/reply`, { content }, config);

export const CreateReplyGroupMessageAPI = ({ id, content, messageId }: CreateReplyMessageParams) =>
    axiosClient.post(`/groups/${id}/messages/${messageId}/reply`, { content }, config);

export const ChangeEmojiIcon = ({ id, emoji }: ChangeEmojiIconParams) =>
    axiosClient.post(`/conversations/${id}/emoji`, { emoji }, config);

export const ChangeGroupEmojiIcon = ({ id, emoji }: ChangeEmojiIconParams) =>
    axiosClient.post(`/groups/${id}/emoji`, { emoji }, config);

export const GetConversationMessageWithLimit = ({ id, limit, offset }: GetConversationMessageWithLimitParams) =>
    axiosClient.get(`/conversations/${id}/messages/limit/${limit}/offset/${offset}`, config);

export const GetGroupMessagesWithLimit = ({ id, limit, offset }: GetConversationMessageWithLimitParams) =>
    axiosClient.get(`/groups/${id}/messages/limit/${limit}/offset/${offset}`, config);

export const GetConversationMessagesLength = (id: number) =>
    axiosClient.get(`/conversations/${id}/messages/length`, config);

export const GetGroupMessagesLength = (id: number) => axiosClient.get(`/groups/${id}/messages/length`, config);

export const ChangeConversationNickName = ({ id, nickname, email }: ChangeConversationNickNameParams) =>
    axiosClient.post(
        `/conversations/${id}/nickname`,
        {
            nickname,
            email,
        },
        config,
    );

export const ChangeGroupNickName = ({ id, nickname, email }: ChangeConversationNickNameParams) =>
    axiosClient.post(
        `/groups/${id}/nickname`,
        {
            nickname,
            email,
        },
        config,
    );

export const ForwardMessageToConversationAPI = ({ id, messageId, forwardedId }: ForwardMessageParams) =>
    axiosClient.post(`/conversations/${id}/messages/${messageId}/forward/conversation/${forwardedId}`, {}, config);

export const ForwardMessageToGroupAPI = ({ id, messageId, forwardedId }: ForwardMessageParams) =>
    axiosClient.post(`/conversations/${id}/messages/${messageId}/forward/group/${forwardedId}`, {}, config);

export const ForwardGroupMessageToConversationAPI = ({ id, messageId, forwardedId }: ForwardMessageParams) =>
    axiosClient.post(`/groups/${id}/messages/${messageId}/forward/conversation/${forwardedId}`, {}, config);

export const ForwardGroupMessageToGroupAPI = ({ id, messageId, forwardedId }: ForwardMessageParams) =>
    axiosClient.post(`/groups/${id}/messages/${messageId}/forward/group/${forwardedId}`, {}, config);

export const LeaveGroupAPI = (id: number) => axiosClient.patch(`/groups/${id}/recipients/leave`, {}, config);

export const ChangeConversationTheme = ({ id, theme }: ChangeConversationThemeParams) =>
    axiosClient.post(`/conversations/${id}/theme`, { theme }, config);

export const ChangeGroupTheme = ({ id, theme }: ChangeConversationThemeParams) =>
    axiosClient.post(`/groups/${id}/theme`, { theme }, config);

export const GetGroupAttachments = (groupId: number) => axiosClient.get(`/groups/${groupId}/attachments`, config);

export const GetConversationAttachments = (conversationId: number) => axiosClient.get(`/conversations/${conversationId}/messages/attachments`, config);

export const UpdateSeenMessage = ({
                                      id,
                                      messageId,
                                  }: UpdateSeenMessageParams) => axiosClient.post(`/conversations/${id}/messages/${messageId}/statuses`, {}, config);

export const UpdateSeenGroupMessage = ({
                                           id,
                                           messageId,
                                       }: UpdateSeenMessageParams) => axiosClient.post(`/groups/${id}/messages/${messageId}/statuses`, {}, config);
