import { FiMoreVertical } from 'react-icons/fi';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { GroupMessageType, MessageType } from '../../utils/types';
import Tippy from '@tippyjs/react';
import { MenuContext } from '../menu-context/MenuContext';

type Props = {
    message: MessageType | GroupMessageType;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export const MessageOption: FC<Props> = ({ message, setIsEditing }) => {
    const [visible, setVisible] = useState(false);
    const handleScroll = () => {
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
                className={`w-fit h-fit px-1 py-1 hover:bg-[#8f8888] hover:rounded-full cursor-pointer flex justify-center items-center ${
                    visible ? 'visible' : ''
                }`}
                onClick={() => setVisible((prev) => !prev)}
            >
                <FiMoreVertical size={18} className="text-white" />
            </div>
        </Tippy>
    );
};
