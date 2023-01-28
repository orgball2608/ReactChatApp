import { ConversationTypes } from '../../utils/constants';
import { ConversationType } from '../../utils/types';
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
        <div>
            <div className="flex ml-6 gap-4 my-1">
                {ChatTypes.map((chat, index) => (
                    <div
                        key={index}
                        className={`box-border bg-dark-light rounded-2xl px-2 py-1 ${
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
        </div>
    );
};
