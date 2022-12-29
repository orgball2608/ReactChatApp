import { Outlet, useParams } from 'react-router-dom';
import { ConversationPanel } from '../components/conversations/ConversationPanel';
import { ConversationSidebar } from '../components/conversations/ConversationSideBar';
import { ConversationType } from '../utils/types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConversationsThunk } from '../store/coversationSlice';
import { AppDispatch, RootState } from '../store';

export const ConversationPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams();
    const [conversations, setConversations] = useState<ConversationType[]>([]);
    const conversationsState = useSelector((state: RootState) => state.conversation.conversations);
    useEffect(() => {
        console.log('Fetching Conversations in ConversationPage');
        console.log(conversationsState.find((c) => c.id === 15));
        dispatch(fetchConversationsThunk());
    }, []);

    return (
        <div className="bg-dark-light h-full">
            <ConversationSidebar />
            {!id && <ConversationPanel />}
            <Outlet />
        </div>
    );
};
