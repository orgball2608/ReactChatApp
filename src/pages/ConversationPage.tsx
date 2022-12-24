import { Outlet, useParams } from 'react-router-dom';
import { ConversationPanel } from '../components/conversations/ConversationPanel';
import { ConversationSidebar } from '../components/conversations/ConversationSideBar';
import { ConversationType } from '../utils/types';
import { useEffect, useState } from 'react';
import { getConversations } from '../services/api';
export const ConversationPage = () => {
    const { id } = useParams();
    const [conversations, setConversations] = useState<ConversationType[]>([]);
    useEffect(() => {
        getConversations()
            .then(({ data }) => {
                setConversations(data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="bg-dark-light h-full">
            <ConversationSidebar conversations={conversations} />
            {!id && <ConversationPanel />}
            <Outlet />
        </div>
    );
};
