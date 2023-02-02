import { Outlet, useParams } from 'react-router-dom';
import { ConversationPanel } from '../../components/conversations/ConversationPanel';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchConversationsThunk } from '../../store/coversationSlice';
import { AppDispatch } from '../../store';
import {
    addGroupConversations,
    editGroupConversationsTitle,
    fetchGroupsThunk,
    updateGroupConversations,
} from '../../store/groupSlice';
import { socket } from '../../contex/SocketContext';
import { addGroupMessage, editGroupMessage } from '../../store/groupMessageSlice';
import { GroupMessageEventPayload } from '../../utils/types';
import { deleteGroupMessage } from '../../store/groupMessageSlice';
import { ConversationSidebar } from '../../components/sidebars/ConversationSideBar';

export const GroupPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams();
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
        });

        socket.on('onEditGroupMessage', (payload) => {
            dispatch(editGroupMessage(payload));
        });

        socket.on('onEditGroupTitle', (payload) => {
            dispatch(editGroupConversationsTitle(payload));
        });
        return () => {
            socket.off('onGroupMessage');
            socket.off('onGroupCreate');
            socket.off('onDeleteGroupMessage');
            socket.off('onEditGroupMessage');
            socket.off('onEditGroupTitle');
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
