import React, { FC } from 'react';
import { BsReplyFill } from 'react-icons/bs';
import { GroupMessageType, MessageType } from '../../utils/types';

type Props = {
    setReplyInfo: React.Dispatch<React.SetStateAction<MessageType | GroupMessageType | undefined>>;
    message: MessageType | GroupMessageType;
};

export const MessageReplyIcon: FC<Props> = ({ setReplyInfo, message }) => {
    return (
        <span
            onClick={() => setReplyInfo(message)}
            className="w-fit h-fit p-1 hover:bg-dark-lighten hover:rounded-full cursor-pointer"
        >
            <BsReplyFill size={18} className="text-gray-300 hover:opacity-100"/>
        </span>
    );
};
