import { createContext, Dispatch, SetStateAction } from 'react';
import { GroupMessageType, MessageType } from '../utils/types';

type MessageMenuContextType = {
    message: MessageType | GroupMessageType | null;
    setMessage: Dispatch<SetStateAction<MessageType | GroupMessageType | null>>;
    editMessage: MessageType | GroupMessageType | null;
    setEditMessage: Dispatch<SetStateAction<MessageType | GroupMessageType | null>>;
};

export const MessageMenuContext = createContext<MessageMenuContextType>({
    message: null,
    setMessage: () => {},
    editMessage: null,
    setEditMessage: () => {},
});
