import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { ConversationPanel } from '../../components/conversations/ConversationPanel';
import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchConversationsThunk } from '../../store/coversationSlice';
import { AppDispatch } from '../../store';
import {
    addGroupConversations,
    deleteGroupConversations,
    editGroupConversationsTitle,
    fetchGroupsThunk,
    updateGroupConversations,
    updateGroupDeleteMessage,
    updateGroupEditMessage,
} from '../../store/groupSlice';
import { socket } from '../../contex/SocketContext';
import { addGroupMessage, editGroupMessage } from '../../store/groupMessageSlice';
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
        dispatch(fetchConversationsThunk());
        dispatch(fetchGroupsThunk());
    }, []);

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
            console.log(payload);
            dispatch(updateGroupConversations(payload));
        });

        return () => {
            socket.off('onGroupMessage');
            socket.off('onGroupCreate');
            socket.off('onDeleteGroupMessage');
            socket.off('onEditGroupMessage');
            socket.off('onEditGroupTitle');
            socket.off('onGroupRemovedUser');
            socket.off('onGroupOwnerChange');
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
