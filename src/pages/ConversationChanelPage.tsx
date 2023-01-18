import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessagePanel } from '../components/messages/MessagePanel';
import { MessageEventPayload } from '../utils/types';
import { SocketContext } from '../contex/SocketContext';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { addMessage, fetchMessagesThunk, deleteMessage, editMessage } from '../store/messageSlice';
import { updateConversation } from '../store/coversationSlice';
import { AuthContext } from '../contex/AuthContext';

export const ConversationChannelPage = () => {
    const { id } = useParams<{ id: string }>();
    const socket = useContext(SocketContext);
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useContext(AuthContext);

    const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
    const [isTyping, setIsTyping] = useState(false);
    const [isRecipientTyping, setIsRecipientTyping] = useState(false);

    useEffect(() => {
        const conversationId = parseInt(id!);
        dispatch(fetchMessagesThunk(conversationId));
    }, [id]);

    useEffect(() => {
        socket.on('onTypingStart', () => {
            setIsRecipientTyping(true);
        });

        socket.on('onTypingStop', () => {
            setIsRecipientTyping(false);
        });

        return () => {
            socket.off('onTypingStart');
            socket.off('onTypingStop');
        };
    }, [id]);

    useEffect(() => {
        socket.on('onMessage', (payload: MessageEventPayload) => {
            const { conversation } = payload;
            dispatch(addMessage(payload));
            dispatch(updateConversation(conversation));
        });
        socket.on('onMessageDelete', (payload) => {
            console.log(payload);
            dispatch(deleteMessage(payload));
        });
        socket.on('onMessageUpdate', (payload) => {
            dispatch(editMessage(payload));
        });
        return () => {
            socket.off('connected');
            socket.off('onMessage');
            socket.off('onMessageDelete');
            socket.off('onMessageUpdate');
        };
    }, []);

    const sendTypingStatus = () => {
        if (isTyping) {
            console.log('isTyping = true');
            clearTimeout(timer);
            setTimer(
                setTimeout(() => {
                    console.log('User stopped typing');
                    socket.emit('onTypingStop', { conversationId: id, userId: user?.id });
                    setIsTyping(false);
                }, 4000),
            );
        } else {
            console.log('isTyping = false');
            setIsTyping(true);
            socket.emit('onTypingStart', { conversationId: id, userId: user?.id });
        }
    };

    return (
        <>
            <div className={`h-full ml-80`}>
                <MessagePanel sendTypingStatus={sendTypingStatus} recipientIsTyping={isRecipientTyping} />
            </div>
        </>
    );
};
