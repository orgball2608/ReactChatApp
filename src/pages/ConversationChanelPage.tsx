import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MessagePanel } from '../components/messages/MessagePanel';
import { MessageEventPayload } from '../utils/types';
import { SocketContext } from '../contex/SocketContext';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { addMessage, fetchMessagesThunk, deleteMessage } from '../store/messageSlice';
import { updateConversation } from '../store/coversationSlice';

export const ConversationChannelPage = () => {
    const { id } = useParams<{ id: string }>();
    const socket = useContext(SocketContext);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const conversationId = parseInt(id!);
        dispatch(fetchMessagesThunk(conversationId));
    }, [id]);

    useEffect(() => {
        socket.on('onClientConnect', () => console.log('Connected'));
        socket.on('onMessage', (payload: MessageEventPayload) => {
            const { conversation } = payload;
            dispatch(addMessage(payload));
            dispatch(updateConversation(conversation));
        });
        socket.on('onMessageDelete', (payload) => {
            console.log('Message Deleted');
            console.log(payload);
            dispatch(deleteMessage(payload));
        });
        return () => {
            socket.off('connected');
            socket.off('onMessage');
            socket.off('onMessageDelete');
        };
    }, []);

    const sendTypingStatus = () => {
        console.log('You are typing');
        socket.emit('onUserTyping', { conversationId: id });
    };

    return (
        <>
            <div className={`h-full ml-80`}>
                <MessagePanel sendTypingStatus={sendTypingStatus} />
            </div>
        </>
    );
};
