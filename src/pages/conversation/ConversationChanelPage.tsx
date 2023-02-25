import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MessagePanel } from '../../components/messages/MessagePanel';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { loadMoreMessagesThunk, resetMessages } from '../../store/messageSlice';
import { ConversationSettingSideBar } from '../../components/sidebars/ConversationSettingSideBar';

export const ConversationChannelPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const showSidebar = useSelector((state: RootState) => state.settingSidebar.showSidebar);

    useEffect(() => {
        dispatch(resetMessages());
        const conversationId = parseInt(id!);
        dispatch(loadMoreMessagesThunk({ id: conversationId, limit: 10, offset: 0 }));
    }, [id]);

    return (
        <div className={`h-full w-full flex`}>
            <MessagePanel />
            {showSidebar && <ConversationSettingSideBar />}
        </div>
    );
};
