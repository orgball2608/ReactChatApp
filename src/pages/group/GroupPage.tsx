import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { ConversationPanel } from '../../components/conversations/ConversationPanel';
import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {
    addGroupConversations,
    changeGroupEmoji,
    deleteGroupConversations,
    editGroupConversationsTitle,
    updateGroupAdded,
    updateGroupAvatarState,
    updateGroupConversations,
    updateGroupDeleteMessage,
    updateGroupEditMessage,
    updateGroupRecipientAdd,
} from '../../store/groupSlice';
import { socket } from '../../contex/SocketContext';
import { addGroupMessage, editGroupMessage, reactGroupMessage } from '../../store/groupMessageSlice';
import { GroupMessageEventPayload } from '../../utils/types';
import { deleteGroupMessage } from '../../store/groupMessageSlice';
import { ConversationSidebar } from '../../components/sidebars/ConversationSideBar';
import { AuthContext } from '../../contex/AuthContext';

export const GroupPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
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
