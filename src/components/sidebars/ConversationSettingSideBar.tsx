import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contex/AuthContext';
import { RootState } from '../../store';
import { getFullName } from '../../utils/helpers';
import { CustomizeConversationOptions } from '../conversation-options/CustomizeConversationOptions';
import defaultAvatar from '../../__assets__/default_avatar.jpg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { MediaListFile } from '../conversation-options/MediaListFile';
import { MediaFileSideBar } from '../conversation-options/MediaFileSideBar';

export const ConversationSettingSideBar = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const conversationId = parseInt(id!);
    const conversations = useSelector((state: RootState) => state.conversation.conversations);
    const onlineFriends = useSelector((state: RootState) => state.friends.onlineFriends);
    const [showFileSideBar, setShowFileSideBar] = useState<boolean>(false);

    const selectedConversation = conversations.find((group) => group.id === conversationId);
    const recipientUser =
        selectedConversation?.recipient.id !== user?.id
            ? selectedConversation?.recipient
            : selectedConversation?.creator;

    const isOnline = onlineFriends.find((friend) => friend.id === recipientUser?.id) ? true : false;

    const getAvatar = () => {
        if (recipientUser?.profile) return recipientUser?.profile.avatar;
        return defaultAvatar;
    };

    return (
        <>
            {showFileSideBar ? (
                <MediaFileSideBar setShowFileSideBar={setShowFileSideBar} />
            ) : (
                <aside className="w-72 flex-none bg-[#141414] px-2 gap-4 flex flex-col border-border-conversations border-l-[1px] ">
                    <div className="flex flex-col gap-2 justify-center items-center mt-4 px-3 ">
                        <LazyLoadImage
                            src={getAvatar() || defaultAvatar}
                            alt={'avatar'}
                            className="w-28 h-28 rounded-full object-cover "
                        />
                        <div className="flex flex-col items-center">
                            <span className="text-center break-all text-xl">
                                {getFullName(user, selectedConversation)}
                            </span>
                            {isOnline && <span className="text-base text-gray-400">Online</span>}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 justify-center">
                        <CustomizeConversationOptions />
                        <MediaListFile setShowFileSideBar={setShowFileSideBar} />
                    </div>
                </aside>
            )}
        </>
    );
};
