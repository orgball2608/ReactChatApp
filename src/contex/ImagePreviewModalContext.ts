import { createContext, Dispatch, SetStateAction } from 'react';
import { AttachmentType } from '../utils/types';

type MessageMenuContextType = {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    attachment: AttachmentType | undefined;
    setAttachment: Dispatch<SetStateAction<AttachmentType | undefined>>;
};

export const ImagePreviewModalContext = createContext<MessageMenuContextType>({
    showModal: false,
    setShowModal: () => {},
    attachment: undefined,
    setAttachment: () => {},
});
