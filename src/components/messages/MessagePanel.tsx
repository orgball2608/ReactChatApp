import React, { FC, useState } from 'react';
import { MessageType } from '../../utils/types';
import { MessagePanelHeader } from './MessagePanelHeader';
import { MessageContainer } from './MessageContainer';
import { MessagePanelBody } from './MessagePanelBody';
import { MessageInputField } from './MessageInputField';
import { useParams } from 'react-router-dom';
import { postNewMessage } from '../../services/api';

type Props = {
    messages: MessageType[];
};
export const MessagePanel: FC<Props> = ({ messages }) => {
    const [content, setContent] = useState('');
    const { id } = useParams();

    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!id || !content) return;
        const conversationId = parseInt(id);
        try {
            console.log(`sendMessage`);
            await postNewMessage({ conversationId, content });
            setContent('');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="bg-inherit h-full box-border relative">
                <MessagePanelHeader />
                <MessagePanelBody>
                    <MessageContainer messages={messages} />
                    <MessageInputField content={content} setContent={setContent} sendMessage={sendMessage} />
                </MessagePanelBody>
            </div>
        </>
    );
};
