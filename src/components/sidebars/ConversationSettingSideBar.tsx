import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contex/AuthContext';
import { RootState } from '../../store';
import { getFullName } from '../../utils/helpers';
import { CustomizeConversationOptions } from '../conversation-options/CustomizeConversationOptions';
import { defaultAvatar } from '../../utils/constants';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { MediaListFile } from '../conversation-options/MediaListFile';
import { FileSideBar } from './FileSideBar';
import { EmojiSelectModal } from '../modals/EmojiSelectModal';
import { ChangeNickNameModal } from '../modals/nicknames/ChangeNickNameModal';
import { ChangeThemeModal } from '../modals/ChangeThemeModal';

export const ConversationSettingSideBar = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const conversationId = parseInt(id!);
    const conversations = useSelector((state: RootState) => state.conversation.conversations);
    const onlineFriends = useSelector((state: RootState) => state.friends.onlineFriends);
    const [showMediaFileSideBar, setShowMediaFileSideBar] = useState<boolean>(false);
    const [showFileSideBar, setShowFileSideBar] = useState<boolean>(false);
    const [showChangeEmojiModal, setShowChangeEmojiModal] = useState(false);
    const [showChangeNickNameModal, setShowChangeNickNameModal] = useState(false);
    const [showChangeThemeModal, setShowChangeThemeModal] = useState(false);
    const showSidebar = useSelector((state: RootState) => state.settingSidebar.showSidebar);

    useEffect(()=>{
        setShowMediaFileSideBar(false)
        setShowFileSideBar(false)
    },[id])

    const selectedConversation = conversations.find((group) => group.id === conversationId);
    const recipientUser =
        selectedConversation?.recipient.id !== user?.id
            ? selectedConversation?.recipient
            : selectedConversation?.creator;

    const isOnline = !!onlineFriends.find((friend) => friend.id === recipientUser?.id);

    const getAvatar = () => {
        if (recipientUser?.profile) return recipientUser?.profile.avatar;
        return defaultAvatar;
    };
    return (
        <>
            {showChangeEmojiModal && <EmojiSelectModal setShowModal={setShowChangeEmojiModal} />}
            {showChangeNickNameModal && <ChangeNickNameModal setShowModal={setShowChangeNickNameModal} />}
            {showChangeThemeModal && <ChangeThemeModal setShowModal={setShowChangeThemeModal} />}
            {showMediaFileSideBar || showFileSideBar ? (
                <FileSideBar
                    setShowFileSideBar={setShowFileSideBar}
                    setShowMediaFileSideBar={setShowMediaFileSideBar}
                    showFileSideBar={showFileSideBar}
                    showMediaFileSideBar={showMediaFileSideBar}
                />
            ) : (
                <aside className={`lg:w-72 w-76 flex-none px-2 gap-4 flex flex-col border-border-conversations lg:border-l-[1px] border-r-[1px] shrink-0 top-0 left-0 lg:sticky md:translate-x-0 lg:bg-transparent lg:shadow-none
      -translate-x-full fixed h-screen shadow-md transition duration-300 bg-[#333335] z-30 ${showSidebar && "translate-x-0"}`}>
                    <div className="flex flex-col gap-2 justify-center items-center mt-4 px-3 ">
                        <LazyLoadImage
                            src={getAvatar() || defaultAvatar}
                            alt={'avatar'}
                            className="w-28 h-28 rounded-full object-cover "
                        />
                        <div className="flex flex-col items-center">
                            <span className="text-center break-all text-xl font-medium">
                                {getFullName(user, selectedConversation)}
                            </span>
                            {isOnline && <span className="text-base text-gray-400">Online</span>}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <CustomizeConversationOptions
                            setShowChangeEmojiModal={setShowChangeEmojiModal}
                            setShowChangeNickNameModal={setShowChangeNickNameModal}
                            setShowChangeThemeModal={setShowChangeThemeModal}
                        />
                        <MediaListFile
                            setShowMediaFileSideBar={setShowMediaFileSideBar}
                            setShowFileSideBar={setShowFileSideBar}
                        />
                    </div>
                </aside>
            )}
        </>
    );
};
