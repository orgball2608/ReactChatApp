import { createContext, Dispatch, SetStateAction } from 'react';
import { MessageType } from '../utils/types';

type MessageMenuContextType = {
    message: MessageType | null;
    setMessage: Dispatch<SetStateAction<MessageType | null>>;
    editMessage: MessageType | null;
    setEditMessage: Dispatch<SetStateAction<MessageType | null>>;
};

export const MessageMenuContext = createContext<MessageMenuContextType>({
    message: null,
    setMessage: () => {},
    editMessage: null,
    setEditMessage: () => {},
});
