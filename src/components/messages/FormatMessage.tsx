import { MessageType, User } from '../../utils/types';
import React, { ChangeEvent, Dispatch, FC, SetStateAction, useContext } from 'react';
import moment from 'moment';
import { FiMoreVertical } from 'react-icons/fi';
import { MessageMenuContext } from '../../contex/MessageMenuContext';
import { EditMessageContainer } from './EditMessageContainer';

type FormattedMessageProps = {
    user?: User;
    message: MessageType;
    handleShowMenu: (e: React.MouseEvent<SVGElement>, message: MessageType) => void;
    isEditing: boolean;
    onEditMessageChange: (e: ChangeEvent<HTMLInputElement>) => void;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export const FormattedMessage: FC<FormattedMessageProps> = ({
    user,
    message,
    handleShowMenu,
    isEditing,
    onEditMessageChange,
    setIsEditing,
}) => {
    const { message: m } = useContext(MessageMenuContext);
    const { editMessage } = useContext(MessageMenuContext);
    return (
        <div className="flex gap-4 pt-3 pb-1 items-center">
            <div className="w-10 h-10 rounded-full bg-red-500"></div>
            <div className=" flex-col gap-3 w-full">
                <div className="flex gap-3 py-1">
                    <span
                        className="text-[#6d6d6d] text-base font-bold"
                        style={{
                            color: user?.id === message.author.id ? '#989898' : '#5E8BFF',
                        }}
                    >
                        {message.author.firstName} {message.author.lastName}
                    </span>
                    <span className="font-semi-bold">{moment(message.createdAt).fromNow()}</span>
                </div>
                {isEditing && message.id === editMessage?.id ? (
                    <div className="text-base flex justify-start items-center">
                        <EditMessageContainer
                            onEditMessageChange={onEditMessageChange}
                            editMessage={editMessage}
                            setIsEditing={setIsEditing}
                        />
                    </div>
                ) : (
                    <div className="text-base flex justify-start items-center">
                        <div>{message.content}</div>
                        <FiMoreVertical size={14} className="ml-1" onClick={(e) => handleShowMenu(e, message)} />
                    </div>
                )}
            </div>
        </div>
    );
};
