import { RxFace } from 'react-icons/rx';
import { FC, useState } from 'react';
import { ReactionPopup } from './ReactionPopup';
import Tippy from '@tippyjs/react';
import { GroupMessageType, MessageType } from '../../utils/types';

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
                className={`w-fit h-fit p-1 hover:bg-[#8f8888] hover:rounded-full cursor-pointer  ${
                    visible ? 'visible' : ''
                }`}
            >
                <RxFace size={18} className="text-white hover:opacity-100 font-bold" />
            </div>
        </Tippy>
    );
};
