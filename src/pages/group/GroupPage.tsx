import { Outlet, useParams } from 'react-router-dom';
import { ConversationPanel } from '../../components/conversations/ConversationPanel';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchConversationsThunk } from '../../store/coversationSlice';
import { AppDispatch } from '../../store';
import { addGroupConversations, fetchGroupsThunk, updateGroupConversations } from '../../store/groupSlice';
import { socket } from '../../contex/SocketContext';
import { addGroupMessage, editGroupMessage } from '../../store/groupMessageSlice';
import { GroupMessageEventPayload } from '../../utils/types';
import { deleteGroupMessage } from '../../store/groupMessageSlice';

export const GroupPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams();
    useEffect(() => {
        dispatch(fetchConversationsThunk());
        dispatch(fetchGroupsThunk());
    }, []);

    useEffect(() => {
        socket.on('onGroupMessage', (payload: GroupMessageEventPayload) => {
            console.log('Group Message Received');
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
        return () => {
            socket.off('onGroupMessage');
            socket.off('onGroupCreate');
            socket.off('onDeleteGroupMessage');
            socket.off('onEditGroupMessage');
        };
    }, [id]);

    return (
        <div className="bg-dark-light h-full w-full flex">
            {!id && <ConversationPanel />}
            <Outlet />
        </div>
    );
};
