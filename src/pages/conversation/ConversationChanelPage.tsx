import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MessagePanel } from '../../components/messages/MessagePanel';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchMessagesThunk } from '../../store/messageSlice';
import { ConversationSettingSideBar } from '../../components/sidebars/ConversationSettingSideBar';

export const ConversationChannelPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const showSidebar = useSelector((state: RootState) => state.settingSidebar.showSidebar);

    useEffect(() => {
        const conversationId = parseInt(id!);
        dispatch(fetchMessagesThunk(conversationId));
    }, [id]);

    return (
        <div className={`h-full w-full flex`}>
            <MessagePanel />
            {showSidebar && <ConversationSettingSideBar />}
        </div>
    );
};
