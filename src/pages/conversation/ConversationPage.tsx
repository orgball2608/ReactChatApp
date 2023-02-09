import { Outlet, useParams } from 'react-router-dom';
import { ConversationPanel } from '../../components/conversations/ConversationPanel';
import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchConversationsThunk, updateConversation, updateEditMessage } from '../../store/coversationSlice';
import { AppDispatch } from '../../store';
import { fetchGroupsThunk } from '../../store/groupSlice';
import { ConversationSidebar } from '../../components/sidebars/ConversationSideBar';
import { SocketContext } from '../../contex/SocketContext';
import { MessageEventPayload } from '../../utils/types';
import { addMessage, deleteMessage, editMessage } from '../../store/messageSlice';

export const ConversationPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams();
    const socket = useContext(SocketContext);
    useEffect(() => {
        console.log('Fetching Conversations in ConversationPage');
        dispatch(fetchConversationsThunk());
        dispatch(fetchGroupsThunk());
    }, []);

    useEffect(() => {
        socket.on('onMessage', (payload: MessageEventPayload) => {
            const { conversation } = payload;
            dispatch(addMessage(payload));
            dispatch(updateConversation(conversation));
        });
        socket.on('onMessageDelete', (payload) => {
            dispatch(deleteMessage(payload));
        });
        socket.on('onMessageUpdate', (payload) => {
            dispatch(editMessage(payload));
            dispatch(
                updateEditMessage({
                    id: parseInt(id!),
                    messageId: payload.id,
                    content: payload.content,
                }),
            );
        });
        return () => {
            socket.off('connected');
            socket.off('onMessage');
            socket.off('onMessageDelete');
            socket.off('onMessageUpdate');
        };
    }, []);

    return (
        <div className="bg-dark-light h-full w-full flex">
            <ConversationSidebar />
            {!id && <ConversationPanel />}
            <Outlet />
        </div>
    );
};
