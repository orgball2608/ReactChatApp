import { Outlet, useParams } from 'react-router-dom';
import { ConversationPanel } from '../../components/conversations/ConversationPanel';
import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    changeConversationEmoji,
    changeConversationNickname,
    updateConversation,
    updateDeleteMessageEvent,
    updateEditMessage,
} from '../../store/coversationSlice';
import { AppDispatch } from '../../store';
import { ConversationSidebar } from '../../components/sidebars/ConversationSideBar';
import { SocketContext } from '../../contex/SocketContext';
import { MessageEventPayload } from '../../utils/types';
import { addMessage, deleteMessage, editMessage, reactMessage } from '../../store/messageSlice';

export const ConversationPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams();
    const socket = useContext(SocketContext);
    useEffect(() => {
        socket.on('onMessage', (payload: MessageEventPayload) => {
            const { conversation } = payload;
            dispatch(addMessage(payload));
            dispatch(updateConversation(conversation));
        });
        socket.on('onMessageDelete', (payload) => {
            const { conversation, messageId } = payload;
            dispatch(deleteMessage(payload));
            dispatch(
                updateDeleteMessageEvent({
                    conversationId: parseInt(id!),
                    messageId: messageId,
                    conversation: conversation,
                }),
            );
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

        socket.on('onReactMessage', (payload) => {
            dispatch(reactMessage(payload));
        });

        socket.on('onReactMessageRemove', (payload) => {
            dispatch(reactMessage(payload));
        });

        socket.on('onChangeConversationEmoji', (payload) => {
            dispatch(changeConversationEmoji(payload));
        });

        socket.on('onChangeConversationNickname', (payload) => {
            dispatch(changeConversationNickname(payload));
        });

        return () => {
            socket.off('connected');
            socket.off('onMessage');
            socket.off('onMessageDelete');
            socket.off('onMessageUpdate');
            socket.off('onReactMessage');
            socket.off('onReactMessageRemove');
            socket.off('onChangeConversationEmoji');
            socket.off('onChangeConversationNickname');
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
