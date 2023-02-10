import { FiMoreVertical } from 'react-icons/fi';
import React, { FC, useContext } from 'react';
import { GroupMessageType, MessageType } from '../../utils/types';
import { AuthContext } from '../../contex/AuthContext';

type Props = {
    message: MessageType | GroupMessageType;
    handleShowMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, message: MessageType | GroupMessageType) => void;
};

export const MessageOption: FC<Props> = ({ message, handleShowMenu }) => {
    const { user } = useContext(AuthContext);
    return (
        <div
            className={`w-fit h-fit px-1 py-1 hover:bg-[#686868] hover:rounded-full cursor-pointer ${
                user?.id === message.author.id ? 'mr-1' : 'ml-1'
            }`}
            onClick={(e) => handleShowMenu(e, message)}
        >
            <FiMoreVertical size={16} className="text-white" />
        </div>
    );
};
