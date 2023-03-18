import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { ConversationPanel } from '../../components/conversations/ConversationPanel';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import {
    addGroupConversations,
    changeGroupEmoji,
    changeGroupNickName,
    changeGroupTheme,
    deleteGroupConversations,
    editGroupConversationsTitle,
    leaveGroup,
    removeRecipientWhenLeaveGroup,
    updateGroupAdded,
    updateGroupAvatarState,
    updateGroupConversations,
    updateGroupDeleteMessage,
    updateGroupEditMessage,
    updateGroupRecipientAdd,
    updateLastGroupMessageSeen,
} from '../../store/groupSlice';
import { socket } from '../../contex/SocketContext';
import {
    addGroupMessage,
    deleteGroupMessage,
    editGroupMessage,
    reactGroupMessage,
} from '../../store/groupMessageSlice';
import { GroupMessageEventPayload } from '../../utils/types';
import { ConversationSidebar } from '../../components/sidebars/ConversationSideBar';
import { AuthContext } from '../../contex/AuthContext';

export const GroupPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const groups = useSelector((state:RootState)=>state.group.groups)

    useEffect(() => {
        groups.map((group)=> {
            socket.emit('onGroupJoin', { groupId: group.id });
        })

        socket.on('onGroupMessage', (payload: GroupMessageEventPayload) => {
            const { group } = payload;
            dispatch(addGroupMessage(payload));
            dispatch(updateGroupConversations(group));
        });

        socket.on('onGroupCreate', (payload) => {
            dispatch(addGroupConversations(payload));
        });

        socket.on('onDeleteGroupMessage', (payload) => {
            dispatch(deleteGroupMessage(payload));
            dispatch(updateGroupDeleteMessage(payload));
        });

        socket.on('onEditGroupMessage', (payload) => {
            dispatch(editGroupMessage(payload));
            const { id: messageId, content } = payload;
            dispatch(
                updateGroupEditMessage({
                    messageId,
                    content,
                    id: parseInt(id!),
                }),
            );
        });

        socket.on('onEditGroupTitle', (payload) => {
            dispatch(editGroupConversationsTitle(payload));
        });

        socket.on('onGroupRemovedUser', (payload) => {
            if (payload.user.id === user?.id) {
                dispatch(deleteGroupConversations(payload.group));
                navigate('/groups');
            } else dispatch(updateGroupConversations(payload.group));
        });

        socket.on('onGroupOwnerChange', (payload) => {
            dispatch(updateGroupConversations(payload));
        });

        socket.on('onGroupUpdateAvatar', (payload) => {
            dispatch(updateGroupAvatarState(payload));
        });

        socket.on('onGroupReceivedNewUser', (payload) => {
            dispatch(updateGroupRecipientAdd(payload));
        });

        socket.on('onGroupUserAdd', (payload) => {
            dispatch(updateGroupAdded(payload));
        });

        socket.on('onReactGroupMessage', (payload) => {
            dispatch(reactGroupMessage(payload));
        });

        socket.on('onReactGroupMessageRemove', (payload) => {
            dispatch(reactGroupMessage(payload));
        });

        socket.on('onChangeGroupEmoji', (payload) => {
            dispatch(changeGroupEmoji(payload));
        });

        socket.on('onChangeGroupNickname', (payload) => {
            dispatch(changeGroupNickName(payload));
        });

        socket.on('onLeaveGroup', (payload) => {
            dispatch(leaveGroup(payload));
        });

        socket.on('onGroupUserLeave', (payload) => {
            dispatch(removeRecipientWhenLeaveGroup(payload));
        });

        socket.on('onChangeGroupTheme', (payload) => {
            dispatch(changeGroupTheme(payload));
        });

        socket.on('onUpdateGroupMessageStatus', (payload) => {
            dispatch(updateLastGroupMessageSeen(payload));
        });

        return () => {
            socket.off('onGroupMessage');
            socket.off('onGroupCreate');
            socket.off('onDeleteGroupMessage');
            socket.off('onEditGroupMessage');
            socket.off('onEditGroupTitle');
            socket.off('onGroupRemovedUser');
            socket.off('onGroupOwnerChange');
            socket.off('onGroupUpdateAvatar');
            socket.off('onGroupReceivedNewUser');
            socket.off('onGroupUserAdd');
            socket.off('onReactGroupMessage');
            socket.off('onReactGroupMessageRemove');
            socket.off('onChangeGroupEmoji');
            socket.off('onChangeGroupNickname');
            socket.off('onLeaveGroup');
            socket.off('onGroupUserLeave');
            socket.off('onChangeGroupTheme');
            socket.off('onUpdateGroupMessageStatus')
            groups.map((group)=> {
                socket.emit('onGroupLeave', { GroupId: group.id });
            })
        };
    }, [id]);

    return (
        <div className="bg-dark-light h-full w-full flex">
            <ConversationSidebar />
            {!id && <ConversationPanel />}
            <Outlet />
        </div>
    );
};
