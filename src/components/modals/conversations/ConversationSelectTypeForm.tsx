import { ConversationTypes } from '../../../utils/constants';
import { ConversationType } from '../../../utils/types';
import React, { Dispatch, FC, SetStateAction } from 'react';

type Props = {
    conversationType: ConversationType;
    setConversationType: Dispatch<SetStateAction<ConversationType>>;
};

export const ConversationSelectTypeForm: FC<Props> = ({ conversationType, setConversationType }) => {
    const ChatTypes = ConversationTypes;
    const handleSetConversationType = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, data: ConversationType) => {
        setConversationType(data);
    };
    return (
        <div className="flex ml-6 gap-2 cursor-pointer text-base bg-[#1c1c1c] w-fit rounded-full p-[3px]">
            {ChatTypes.map((chat, index) => (
                <div
                    key={index}
                    className={`box-border rounded-full px-4 py-1 ${
                        conversationType === chat.type
                            ? 'border-b-[2px] border-dark-light bg-[#b1b1b1] text-[#292929] border-solid'
                            : ''
                    }`}
                    onClick={(e) => handleSetConversationType(e, chat.type)}
                >
                    {chat.label}
                </div>
            ))}
        </div>
    );
};
