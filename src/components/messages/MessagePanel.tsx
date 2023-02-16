import { useContext, useState } from 'react';
import { MessagePanelHeader } from './MessagePanelHeader';
import { MessageContainer } from './MessageContainer';
import { MessagePanelBody } from './MessagePanelBody';
import { MessageInputField } from './MessageInputField';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contex/AuthContext';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getDisplayName, getRecipientFromConversation } from '../../utils/helpers';
import { defaultAvatar } from '../../utils/constants';

export const MessagePanel = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);

    const conversations = useSelector((state: RootState) => state.conversation.conversations);
    const conversation = conversations.find((conversation) => conversation.id === parseInt(id!));
    const [isRecipientTyping, setIsRecipientTyping] = useState(false);

    const recipient = getRecipientFromConversation(conversation, user);

    return (
        <div className="bg-inherit h-full w-full box-border relative">
            <MessagePanelHeader />
            <MessagePanelBody>
                <MessageContainer />
                <div>
                    {isRecipientTyping && (
                        <div className="w-full px-6 flex gap-2 items-center">
                            <img src={recipient?.profile.avatar || defaultAvatar} className="w-8 h-8 rounded-full" />
                            <span className="text-gray-400 text-sm ml-2">
                                {getDisplayName(recipient!)} is typing...
                            </span>
                        </div>
                    )}
                    <MessageInputField recipient={recipient} setIsRecipientTyping={setIsRecipientTyping} />
                </div>
            </MessagePanelBody>
        </div>
    );
};
