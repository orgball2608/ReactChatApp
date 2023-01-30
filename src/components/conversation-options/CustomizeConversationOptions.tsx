import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { ChevronDown, ChevronRight, Pencil } from 'akar-icons';

type Props = {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    groupId: number;
};

export const CustomizeConversationOptions: FC<Props> = ({ setShowModal, groupId }) => {
    const [showCustomizeConversation, setShowCustomizeConversation] = useState<boolean>(false);
    useEffect(() => {
        setShowCustomizeConversation(false);
    }, [groupId]);

    const handleShowCustomizeConversation = () => {
        if (showCustomizeConversation) setShowCustomizeConversation(false);
        else setShowCustomizeConversation(true);
    };
    const handleShowModal = () => {
        setShowModal(true);
    };

    return (
        <div className="flex flex-col justify-center ml-2">
            <div
                onClick={handleShowCustomizeConversation}
                className="text-lg flex items-center justify-between font-medium py-1 px-2 my-1 hover:bg-[#1c1e21] rounded-md"
            >
                <span>Customize Conversation</span>
                <div className="px-1 py-1">
                    {showCustomizeConversation ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </div>
            </div>
            {showCustomizeConversation && (
                <div className="flex flex-col justify-center gap-2 px-2 overflow-y-scroll scrollbar-hide overflow-auto">
                    <div
                        onClick={handleShowModal}
                        className="flex justify-start gap-2 items-center rounded-xl px-2 py-1 hover:bg-[#1c1e21]"
                    >
                        <div className="p-1 rounded-full  text-white">
                            <Pencil size={20} />
                        </div>
                        <span className="text-lg">Change conversation title</span>
                    </div>
                </div>
            )}
        </div>
    );
};
