import { Outlet, useParams } from 'react-router-dom';
import { ConversationPanel } from '../../components/conversations/ConversationPanel';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchConversationsThunk } from '../../store/coversationSlice';
import { AppDispatch } from '../../store';
import { fetchGroupsThunk, updateGroupConversations } from '../../store/groupSlice';
import { socket } from '../../contex/SocketContext';
import { addGroupMessage } from '../../store/groupMessageSlice';
import { GroupMessageEventPayload } from '../../utils/types';
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
            console.log('Group Message Received');
            const { group } = payload;
            dispatch(addGroupMessage(payload));
            dispatch(updateGroupConversations(group));
        });
        return () => {
            socket.off('onGroupMessage');
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
