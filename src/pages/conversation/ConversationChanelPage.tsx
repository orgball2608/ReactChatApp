import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessagePanel } from '../../components/messages/MessagePanel';
import { SocketContext } from '../../contex/SocketContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchMessagesThunk } from '../../store/messageSlice';
import { AuthContext } from '../../contex/AuthContext';
import { ConversationSettingSideBar } from '../../components/sidebars/ConversationSettingSideBar';

export const ConversationChannelPage = () => {
    const { id } = useParams<{ id: string }>();
    const socket = useContext(SocketContext);
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useContext(AuthContext);
    const showSidebar = useSelector((state: RootState) => state.settingSidebar.showSidebar);
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
        <div className={`h-full w-full flex`}>
            <MessagePanel sendTypingStatus={sendTypingStatus} recipientIsTyping={isRecipientTyping} />
            {showSidebar && <ConversationSettingSideBar />}
        </div>
    );
};
