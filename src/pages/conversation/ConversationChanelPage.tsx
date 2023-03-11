import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MessagePanel } from '../../components/messages/MessagePanel';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { resetMessages } from '../../store/messageSlice';
import { ConversationSettingSideBar } from '../../components/sidebars/ConversationSettingSideBar';

export const ConversationChannelPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const showSidebar = useSelector((state: RootState) => state.settingSidebar.showSidebar);
    const conversations = useSelector((state: RootState) => state.conversation.conversations);
    const selectedConversation = conversations.find((conversation) => conversation.id === parseInt(id!));

    useEffect(() => {
        dispatch(resetMessages());
    }, [id]);

    useEffect(() => {
        if (selectedConversation?.theme)
            document.body.style.setProperty("--primary-color", selectedConversation.theme);
    }, [selectedConversation]);

    return (
        <div className={`h-full w-full flex`}>
            <MessagePanel />
            {showSidebar && <ConversationSettingSideBar />}
        </div>
    );
};
