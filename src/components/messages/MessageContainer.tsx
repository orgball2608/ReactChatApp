import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contex/AuthContext';
import { FormattedMessage } from './FormatMessage';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useParams } from 'react-router-dom';
import { GroupMessageType, MessageType } from '../../utils/types';
import { MessageMenuContext } from '../../contex/MessageMenuContext';
import { MenuContext } from '../menu-context/MenuContext';
import { EditMessageContainer } from './EditMessageContainer';
import { MessageOption } from './MessageOption';

export const MessageContainer = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [showMenu, setShowMenu] = useState(false);
    const [points, setPoints] = useState({ x: 0, y: 0 });
    const [selectedMessage, setSelectedMessage] = useState<MessageType | GroupMessageType | null>(null);
    const conversationMessages = useSelector((state: RootState) => state.messages.messages);
    const [editMessage, setEditMessage] = useState<MessageType | GroupMessageType | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const selectedType = useSelector((state: RootState) => state.type.type);
    const groupMessages = useSelector((state: RootState) => state.groupMessage.messages);

    const handleOnScroll = () => {
        setShowMenu(false);
    };

    useEffect(() => {
        return () => {
            setEditMessage(null);
            setSelectedMessage(null);
            setIsEditing(false);
        };
    }, [id]);

    const handleOnClick = () => {
        if (points.x > 0 && points.y > 0) {
            setPoints({ x: 0, y: 0 });
            setShowMenu(false);
        }
    };

    const handleShowMenu = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        message: MessageType | GroupMessageType,
    ) => {
        e.preventDefault();
        setShowMenu(true);
        setPoints({ x: e.pageX, y: e.pageY });
        setSelectedMessage(message);
    };

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
        const msgs =
            selectedType === 'private'
                ? conversationMessages.find((cm) => cm.id === parseInt(id!))
                : groupMessages.find((gm) => gm.id === parseInt(id!));
        if (!msgs) return [];
        return msgs.messages.map((m, index, arr) => {
            const nextIndex = index + 1;
            const currentMessage = arr[index];
            const nextMessage = arr[nextIndex];
            if (arr.length === nextIndex || currentMessage.author.id !== nextMessage.author.id) {
                return (
                    <FormattedMessage
                        user={user}
                        message={m}
                        key={m.id}
                        handleShowMenu={handleShowMenu}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        onEditMessageChange={onEditMessageChange}
                    />
                );
            }
            if (currentMessage.author.id === nextMessage.author.id) {
                return (
                    <div
                        className={`flex gap-4 items-center break-all w-1/2 ${
                            user?.id === m.author.id ? 'place-self-end justify-end' : 'place-self-start justify-start'
                        }`}
                        key={m.id}
                    >
                        {isEditing && m.id === editMessage?.id ? (
                            <div className="p-0 pl-14 text-base flex justify-start items-center w-full mt-2">
                                <EditMessageContainer
                                    onEditMessageChange={onEditMessageChange}
                                    editMessage={editMessage}
                                    setIsEditing={setIsEditing}
                                />
                            </div>
                        ) : (
                            <div
                                className={`p-0 pl-14 text-base flex justify-start items-center my-1 ${
                                    user?.id === m.author.id ? 'flex-row-reverse' : ''
                                }`}
                            >
                                <div
                                    className={`bg-dark-header p-2 px-5 rounded-2xl  ${
                                        user?.id === m.author.id ? 'rounded-tr-none' : 'rounded-tl-none'
                                    }`}
                                >
                                    {m.content}
                                </div>
                                <MessageOption message={m} handleShowMenu={handleShowMenu} />
                            </div>
                        )}
                    </div>
                );
            }

            return (
                <FormattedMessage
                    user={user}
                    message={m}
                    key={m.id}
                    handleShowMenu={handleShowMenu}
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
                message: selectedMessage,
                setMessage: setSelectedMessage,
                editMessage: editMessage,
                setEditMessage: setEditMessage,
            }}
        >
            <div
                className="h-full box-border py-2 mt-8 flex flex-col-reverse overflow-y-scroll scrollbar-hide overflow-auto relative outline-0"
                onScroll={handleOnScroll}
                onClick={handleOnClick}
                onKeyDown={handleSubmit}
                tabIndex={0}
            >
                <>{formatMessages()}</>
                {showMenu && <MenuContext points={points} setShowMenu={setShowMenu} setIsEditing={setIsEditing} />}
            </div>
        </MessageMenuContext.Provider>
    );
};
