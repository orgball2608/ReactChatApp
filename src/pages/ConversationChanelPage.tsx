import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getConversationMessages } from '../services/api';
import { MessagePanel } from '../components/messages/MessagePanel';
import { MessageType } from '../utils/types';

export const ConversationChannelPage = () => {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const conversationId = parseInt(id!);
        getConversationMessages(conversationId)
            .then(({ data }) => {
                console.log(data);
                setMessages(data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <>
            <div className={`h-full ml-80`}>
                <MessagePanel messages={messages} />
            </div>
        </>
    );
};
