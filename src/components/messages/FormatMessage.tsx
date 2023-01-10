import { MessageType, User } from '../../utils/types';
import React, { FC, useContext, useEffect } from 'react';
import moment from 'moment';
import { FiMoreVertical } from 'react-icons/fi';
import { MenuContext } from '../Menu-Context/MenuContext';
import { MessageMenuContext } from '../../contex/MessageMenuContext';

type FormattedMessageProps = {
    user?: User;
    message: MessageType;
    handleShowMenu: (e: React.MouseEvent<SVGElement>, message: MessageType) => void;
};

export const FormattedMessage: FC<FormattedMessageProps> = ({ user, message, handleShowMenu }) => {
    const { message: m } = useContext(MessageMenuContext);
    return (
        <div className="flex gap-4 pt-3 pb-1 items-center">
            <div className="w-10 h-10 rounded-full bg-red-500"></div>
            <div className=" flex-col gap-3">
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
                <div className="text-base flex justify-start items-center">
                    <div>{message.content}</div>
                    <FiMoreVertical size={14} className="ml-1" onClick={(e) => handleShowMenu(e, message)} />
                </div>
            </div>
        </div>
    );
};
