import { FC, useState } from 'react';
import { ReactionPopup } from './ReactionPopup';
import Tippy from '@tippyjs/react';
import { GroupMessageType, MessageType } from '../../utils/types';
import { MdOutlineTagFaces } from 'react-icons/md';

type Props = {
    message: MessageType | GroupMessageType;
};

export const MessageReaction: FC<Props> = ({ message }) => {
    const [visible, setVisible] = useState(false);
    return (
        <Tippy
            visible={visible}
            onClickOutside={() => setVisible(false)}
            content={<ReactionPopup message={message} setVisible={setVisible} />}
            placement="top"
            interactive={true}
            animation="fade"
            theme="dark"
        >
            <div
                onClick={() => setVisible(!visible)}
                className={`w-fit h-fit p-1 hover:bg-dark-lighten hover:rounded-full cursor-pointer  ${
                    visible ? 'visible' : ''
                }`}
            >
                <MdOutlineTagFaces size={20} className="text-gray-300 hover:opacity-100" />
            </div>
        </Tippy>
    );
};
