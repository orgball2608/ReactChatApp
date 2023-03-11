import { ChevronDown, ChevronRight } from 'akar-icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChangeNickNameIcon from '../icons/ChangeNickNameIcon';
import LikeIcon from '../icons/LikeIcon';
import { ChangeNickNameModal } from '../modals/nicknames/ChangeNickNameModal';
import { EmojiSelectModal } from '../modals/EmojiSelectModal';
import { ChangeThemeModal } from '../modals/ChangeThemeModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const CustomizeConversationOptions = () => {
    const { id } = useParams();
    const conversationId = parseInt(id!);
    const [showCustomizeConversation, setShowCustomizeConversation] = useState<boolean>(false);
    const [showChangeEmojiModal, setShowChangeEmojiModal] = useState(false);
    const [showChangeNickNameModal, setShowChangeNickNameModal] = useState(false);
    const [showChangeThemeModal, setShowChangeThemeModal] = useState(false);
    const conversations = useSelector((state: RootState) => state.conversation.conversations);
    const selectedConversation = conversations.find((conversation) => conversation.id === parseInt(id!));

    useEffect(() => {
        setShowCustomizeConversation(false);
    }, [conversationId]);

    const handleShowCustomizeConversation = () => {
        if (showCustomizeConversation) setShowCustomizeConversation(false);
        else setShowCustomizeConversation(true);
    };

    const getTheme = () => {
        if (selectedConversation?.theme) return selectedConversation.theme;
        return '#0D90F3';
    };

    return (
        <>
            {showChangeEmojiModal && <EmojiSelectModal setShowModal={setShowChangeEmojiModal} />}
            {showChangeNickNameModal && <ChangeNickNameModal setShowModal={setShowChangeNickNameModal} />}
            {showChangeThemeModal && <ChangeThemeModal setShowModal={setShowChangeThemeModal} />}
            <div className="flex flex-col justify-center ml-2 cursor-pointer font-normal">
                <div
                    onClick={handleShowCustomizeConversation}
                    className=" flex items-center justify-between py-2 px-2 hover:bg-[#1c1e21] rounded-md"
                >
                    <span className="font-normal text-base text-white">Customize Conversation</span>
                    <div className="px-1">
                        {showCustomizeConversation ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </div>
                </div>
                {showCustomizeConversation && (
                    <div className="flex flex-col justify-center overflow-y-scroll scrollbar-hide overflow-auto">
                        <div
                            onClick={() => setShowChangeEmojiModal(true)}
                            className="flex justify-start gap-2 items-center rounded-md px-2 py-2 hover:bg-[#1c1e21]"
                        >
                            <div className="p-2 rounded-full text-white bg-[#373434]">
                                <LikeIcon className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-base">Change Emoji Icon</span>
                        </div>
                        <div
                            onClick={() => setShowChangeNickNameModal(true)}
                            className="flex justify-start gap-2 items-center rounded-md px-2 py-2 hover:bg-[#1c1e21]"
                        >
                            <div className="p-1 rounded-full text-white bg-[#373434]">
                                <ChangeNickNameIcon className="w-6 h-6 font-bold" />
                            </div>
                            <span className="text-base">Change NickName</span>
                        </div>
                        <div
                            onClick={() => setShowChangeThemeModal(true)}
                            className="flex justify-start gap-2 items-center rounded-md px-2 py-2 hover:bg-[#1c1e21]"
                        >
                            <div className="p-1 rounded-full text-white bg-[#373434] flex justify-center items-center relative">
                                <div className= "w-6 h-6 rounded-full" style={{
                                    backgroundColor: getTheme()
                                }}>
                                </div>
                                <span className='w-2 h-2 rounded-full absolute bg-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                                </span>
                            </div>
                            <span className="text-base">Change theme</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
