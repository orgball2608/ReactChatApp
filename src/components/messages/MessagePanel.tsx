import { useContext, useEffect, useState } from 'react';
import { MessagePanelHeader } from './headers/MessagePanelHeader';
import { MessageContainer } from './MessageContainer';
import { MessagePanelBody } from './MessagePanelBody';
import { MessageInputField } from './MessageInputField';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contex/AuthContext';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getDisplayName, getRecipientFromConversation } from '../../utils/helpers';
import { defaultAvatar } from '../../utils/constants';
import { GroupMessageType, MessageType } from '../../utils/types';
import { MessagePanelGroupHeader } from './headers/MessagePanelGroupHeader';

export const MessagePanel = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [replyInfo, setReplyInfo] = useState<MessageType | GroupMessageType>();
    const conversations = useSelector((state: RootState) => state.conversation.conversations);
    const conversation = conversations.find((conversation) => conversation.id === parseInt(id!));
    const [isRecipientTyping, setIsRecipientTyping] = useState(false);
    const [inputSectionOffset, setInputSectionOffset] = useState(0);
    const selectedType = useSelector((state:RootState) => state.type.type)

    const recipient = getRecipientFromConversation(conversation, user);

    useEffect(() => {
        setInputSectionOffset(0);
    }, [id]);

    return (
        <div className="bg-inherit h-full w-full box-border relative">
            {
                selectedType ==='private' ?<MessagePanelHeader /> : <MessagePanelGroupHeader/>
            }
            <MessagePanelBody>
                <MessageContainer setReplyInfo={setReplyInfo} inputSectionOffset={inputSectionOffset} />
                <div className="flex-none w-full relative">
                    {isRecipientTyping && (
                        <div className="w-full absolute -top-6 h-6 bg-dark-light z-30 left-0 px-6 flex gap-2 items-center animate-fade-in">
                            <img src={recipient?.profile?.avatar || defaultAvatar} className="w-6 h-6 rounded-full" alt="avatar"/>
                            <span className="text-gray-400 text-sm ml-2">
                                {getDisplayName(recipient!)} is typing...
                            </span>
                        </div>
                    )}
                    <MessageInputField
                        setIsRecipientTyping={setIsRecipientTyping}
                        replyInfo={replyInfo}
                        setReplyInfo={setReplyInfo}
                        setInputSectionOffset={setInputSectionOffset}
                    />
                </div>
            </MessagePanelBody>
        </div>
    );
};
