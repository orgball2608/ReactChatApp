import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contex/AuthContext';
import { FormattedMessage } from './FormatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { useLocation, useParams } from 'react-router-dom';
import { GroupMessageType, MessageType } from '../../utils/types';
import { MessageMenuContext } from '../../contex/MessageMenuContext';
import { changeType } from '../../store/typeSlice';
import { MessageItem } from './MessageItem';

export const MessageContainer = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const { pathname } = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const conversationMessages = useSelector((state: RootState) => state.messages.messages);
    const [editMessage, setEditMessage] = useState<MessageType | GroupMessageType | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const selectedType = useSelector((state: RootState) => state.type.type);
    const groupMessages = useSelector((state: RootState) => state.groupMessage.messages);

    useEffect(() => {
        return () => {
            setIsEditing(false);
            setEditMessage(null);
        };
    }, [id]);

    const handleSubmit = (event: React.KeyboardEvent<HTMLImageElement>) => {
        if (event.key === 'Escape') setIsEditing(false);
    };

    const onEditMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editMessage) return;
        setEditMessage(
            (prev) =>
                prev && {
                    ...prev,
                    content: e.target.value,
                },
        );
    };

    const formatMessages = () => {
        const conversationPathNameType = pathname.split('/')[1];
        if (selectedType === 'private' && conversationPathNameType === 'groups') dispatch(changeType('group'));

        const msgs =
            selectedType === 'private'
                ? conversationMessages.find((cm) => cm.id === parseInt(id!))
                : groupMessages.find((gm) => gm.id === parseInt(id!));
        if (!msgs) return [];

        return msgs?.messages.map((m, index, arr) => {
            const nextIndex = index + 1;
            const currentMessage = arr[index];
            const prevIndex = nextIndex - 2;
            const prevMessage = arr[prevIndex];
            const nextMessage = arr[nextIndex];
            if (arr.length === nextIndex || currentMessage.author.id !== nextMessage.author.id) {
                return (
                    <FormattedMessage
                        user={user}
                        message={m}
                        key={m.id}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        onEditMessageChange={onEditMessageChange}
                        isOneElement={currentMessage.author.id !== prevMessage?.author.id}
                    />
                );
            }
            if (currentMessage.author.id === nextMessage.author.id) {
                return (
                    <MessageItem
                        m={m}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        onEditMessageChange={onEditMessageChange}
                        currentMessage={currentMessage}
                        prevMessage={prevMessage}
                        index={index}
                    />
                );
            }

            return (
                <FormattedMessage
                    user={user}
                    message={m}
                    key={m.id}
                    isEditing={isEditing}
                    onEditMessageChange={onEditMessageChange}
                    setIsEditing={setIsEditing}
                />
            );
        });
    };

    return (
        <MessageMenuContext.Provider
            value={{
                editMessage: editMessage,
                setEditMessage: setEditMessage,
            }}
        >
            <div
                className="h-full box-border py-2 px-6 mt-8 flex flex-col-reverse overflow-y-auto overflow-auto relative outline-0 gap-1"
                onKeyDown={handleSubmit}
                tabIndex={0}
            >
                <>{formatMessages()}</>
            </div>
        </MessageMenuContext.Provider>
    );
};
