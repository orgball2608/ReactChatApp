import { Outlet, useParams } from 'react-router-dom';
import { ConversationPanel } from '../components/conversations/ConversationPanel';
import { ConversationSidebar } from '../components/conversations/ConversationSideBar';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchConversationsThunk } from '../store/coversationSlice';
import { AppDispatch } from '../store';
import { fetchGroupsThunk } from '../store/groupSlice';

export const ConversationPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams();
    useEffect(() => {
        console.log('Fetching Conversations in ConversationPage');
        dispatch(fetchConversationsThunk());
        dispatch(fetchGroupsThunk());
    }, []);

    return (
        <div className="bg-dark-light h-full">
            <ConversationSidebar />
            {!id && <ConversationPanel />}
            <Outlet />
        </div>
    );
};
