import { FC, SetStateAction } from 'react';
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
            className="w-fit h-fit p-1 hover:bg-[#8f8888] hover:rounded-full cursor-pointer"
        >
            <BsReplyFill size={18} className="text-white hover:opacity-100" />
        </span>
    );
};
