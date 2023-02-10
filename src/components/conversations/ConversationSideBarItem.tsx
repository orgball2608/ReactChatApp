import { Conversation } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import { FC, useContext } from 'react';
import { AuthContext } from '../../contex/AuthContext';
import defaultAvatar from '../../__assets__/default_avatar.jpg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type Props = {
    conversation: Conversation;
};
export const ConversationSideBarItem: FC<Props> = ({ conversation }) => {
    const { user } = useContext(AuthContext);
    const onlineFriends = useSelector((state: RootState) => state.friends.onlineFriends);
    const MAX_MESSAGE_LENGTH = 30;
    const getDisplayUser = (conversation: Conversation) => {
        return conversation.creator.id === user?.id ? conversation.recipient : conversation.creator;
    };

    const recipientUser = conversation?.recipient.id !== user?.id ? conversation?.recipient : conversation?.creator;
    const { profile } = recipientUser;

    const isOnline = onlineFriends.find((friend) => friend.id === recipientUser.id) ? true : false;

    const lastMessageContent = () => {
        const { lastMessageSent } = conversation;
        if (lastMessageSent)
            return lastMessageSent.content.length > MAX_MESSAGE_LENGTH
                ? lastMessageSent.content.slice(0, MAX_MESSAGE_LENGTH).concat('...')
                : lastMessageSent.content;
        return null;
    };

    const navigate = useNavigate();
    return (
        <div
            className={'mt-42 items-center w-full bg-simple-gray'}
            onClick={() => {
                navigate(`/conversations/${conversation.id}`);
            }}
            key={conversation.id}
        >
            <div className="flex justify-start gap-5 mx-6 py-3 box-border border-b-[1px] border-solid border-border-conversations">
                <div className="h-12 w-12 rounded-full relative">
                    <LazyLoadImage
                        src={profile?.avatar || defaultAvatar}
                        alt={'profile'}
                        className="h-12 w-12 rounded-full flex-none object-cover "
                    />
                    {isOnline && (
                        <div className="w-[10px] h-[10px] rounded-full absolute bottom-0 right-1 bg-green-500"></div>
                    )}
                </div>

                <div className="flex flex-col flex-nowrap flex-1 break-all">
                    <span className="block font-bold text-base ">
                        {` ${getDisplayUser(conversation).lastName} ${getDisplayUser(conversation).firstName}`}
                    </span>
                    <span className="text-sm text-white">{lastMessageContent()}</span>
                </div>
            </div>
        </div>
    );
};
