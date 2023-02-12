import React, { FC, useContext, useState } from 'react';
import { MessagePanelHeader } from './MessagePanelHeader';
import { MessageContainer } from './MessageContainer';
import { MessagePanelBody } from './MessagePanelBody';
import { MessageInputField } from './MessageInputField';
import { useParams } from 'react-router-dom';
import { postGroupMessage, postNewMessage } from '../../services/api';
import { AuthContext } from '../../contex/AuthContext';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getRecipientFromConversation } from '../../utils/helpers';

type Props = {
    sendTypingStatus: () => void;
    recipientIsTyping: boolean;
};

export const MessagePanel: FC<Props> = ({ sendTypingStatus, recipientIsTyping }) => {
    const [content, setContent] = useState('');
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const conversations = useSelector((state: RootState) => state.conversation.conversations);
    const [fileList, setFileList] = useState<File[]>([]);
    const conversation = conversations.find((conversation) => conversation.id === parseInt(id!));

    const recipient = getRecipientFromConversation(conversation, user);

    const selectedType = useSelector((state: RootState) => state.type.type);

    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!id || (!fileList && !content)) return;
        const data = new FormData();

        fileList.forEach((file) => {
            data.append('attachments', file);
        });

        data.append('content', content);

        const Id = parseInt(id);
        const params = { id: Id, data };
        if (selectedType === 'private')
            postNewMessage(params)
                .then(() => {
                    setContent('');
                    setFileList([]);
                })
                .catch((err) => console.log(err));
        else
            postGroupMessage(params)
                .then(() => {
                    setContent('');
                    setFileList([]);
                })
                .catch((err) => console.log(err));
    };

    return (
        <>
            <div className="bg-inherit h-full w-full box-border relative">
                <MessagePanelHeader />
                <MessagePanelBody>
                    <MessageContainer />
                    <div>
                        {recipientIsTyping && (
                            <div className="w-full text-base text-[#adadad] box-border h-4 mt-2">
                                {recipientIsTyping ? `${recipient?.firstName} is typing...` : ''}
                            </div>
                        )}
                        <MessageInputField
                            content={content}
                            setContent={setContent}
                            sendMessage={sendMessage}
                            sendTypingStatus={sendTypingStatus}
                            recipient={recipient}
                            setFileList={setFileList}
                            fileList={fileList}
                        />
                    </div>
                </MessagePanelBody>
            </div>
        </>
    );
};
