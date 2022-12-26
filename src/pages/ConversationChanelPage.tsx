import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getConversationMessages } from '../services/api';
import { MessagePanel } from '../components/messages/MessagePanel';
import { MessageEventPayload, MessageType } from '../utils/types';
import { SocketContext } from '../contex/SocketContext';

export const ConversationChannelPage = () => {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const { id } = useParams<{ id: string }>();

    const socket = useContext(SocketContext);

    useEffect(() => {
        const conversationId = parseInt(id!);
        getConversationMessages(conversationId)
            .then(({ data }) => {
                setMessages(data.messages);
            })
            .catch((err) => console.log(err));
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
