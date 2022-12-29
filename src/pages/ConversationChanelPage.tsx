import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessagePanel } from '../components/messages/MessagePanel';
import { MessageEventPayload, MessageType } from '../utils/types';
import { SocketContext } from '../contex/SocketContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchMessagesThunk } from '../store/coversationSlice';

export const ConversationChannelPage = () => {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const { id } = useParams<{ id: string }>();

    const socket = useContext(SocketContext);

    const conversations = useSelector((state: RootState) => state.conversation.conversations);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const conversationId = parseInt(id!);
        dispatch(fetchMessagesThunk(conversationId));
    }, [id]);

    useEffect(() => {
        socket.on('connected', () => console.log('Connected'));
        socket.on('onMessage', (payload: MessageEventPayload) => {
            console.log('Message Received');
            const { conversation, ...message } = payload;
            setMessages((prev) => [message, ...prev]);
        });
        return () => {
            socket.off('connected');
            socket.off('onMessage');
        };
    }, []);

    return (
        <>
            <div className={`h-full ml-80`}>
                <MessagePanel messages={messages} />
            </div>
        </>
    );
};
