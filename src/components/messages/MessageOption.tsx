import { FiMoreVertical } from 'react-icons/fi';
import React, { Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import { GroupMessageType, MessageType } from '../../utils/types';
import { AuthContext } from '../../contex/AuthContext';
import Tippy from '@tippyjs/react';
import { MenuContext } from '../menu-context/MenuContext';

type Props = {
    message: MessageType | GroupMessageType;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export const MessageOption: FC<Props> = ({ message, setIsEditing }) => {
    const [visible, setVisible] = useState(false);
    const { user } = useContext(AuthContext);
    const handleScroll = () => {
        console.log('scroll');
        setVisible(false);
    };
    return (
        <Tippy
            visible={visible}
            onClickOutside={() => setVisible(false)}
            content={<MenuContext message={message} setVisible={setVisible} setIsEditing={setIsEditing} />}
            placement="top"
            interactive={true}
            animation="fade"
            theme="message_option"
        >
            <div
                onScroll={() => handleScroll()}
                className={`w-fit h-fit px-1 py-1 hover:bg-[#686868] hover:rounded-full cursor-pointer ${
                    user?.id === message.author.id ? 'mr-1' : 'ml-1'
                }  ${visible ? 'visible' : ''}`}
                onClick={() => setVisible((prev) => !prev)}
            >
                <FiMoreVertical size={16} className="text-white" />
            </div>
        </Tippy>
    );
};
