import { createContext, Dispatch, SetStateAction } from 'react';
import { GroupMessageType, MessageType } from '../utils/types';

type MessageMenuContextType = {
    editMessage: MessageType | GroupMessageType | null;
    setEditMessage: Dispatch<SetStateAction<MessageType | GroupMessageType | null>>;
    isForwardding: boolean;
    setIsForwardding: Dispatch<SetStateAction<boolean>>;
    setForwardMessage: Dispatch<SetStateAction<MessageType | GroupMessageType | null>>;
    forwardMessage: MessageType | GroupMessageType | null;
};

export const MessageMenuContext = createContext<MessageMenuContextType>({
    editMessage: null,
    setEditMessage: () => {},
    isForwardding: false,
    setIsForwardding: () => {},
    setForwardMessage: () => {},
    forwardMessage: null,
});
