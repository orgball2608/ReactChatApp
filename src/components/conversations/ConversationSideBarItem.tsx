import { Conversation } from '../../utils/types';
import { useNavigate, useParams } from 'react-router-dom';
import { FC, useContext } from 'react';
import { AuthContext } from '../../contex/AuthContext';
import { defaultAvatar } from '../../utils/constants';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import moment from 'moment';
import { getRecipient } from '../../utils/helpers';
type Props = {
    conversation: Conversation;
};
export const ConversationSideBarItem: FC<Props> = ({ conversation }) => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const onlineFriends = useSelector((state: RootState) => state.friends.onlineFriends);
    const MAX_MESSAGE_LENGTH = 25;

    const recipientUser = getRecipient(conversation, user!);
    const { profile } = recipientUser;

    const isOnline = onlineFriends.find((friend) => friend.id === recipientUser.id) ? true : false;

    const lastMessageContent = () => {
        const { lastMessageSent } = conversation;
        if (lastMessageSent) {
            if (
                lastMessageSent.content === '' ||
                (lastMessageSent.attachments && lastMessageSent.attachments?.length > 0)
            ) {
                return `Just sent ${
                    lastMessageSent.attachments?.length > 1 ? `${lastMessageSent.attachments.length}` : 'a'
                } photo`;
            }
            return lastMessageSent.content.length > MAX_MESSAGE_LENGTH
                ? lastMessageSent.content.slice(0, MAX_MESSAGE_LENGTH).concat('...')
                : lastMessageSent.content;
        }
        return null;
    };

    const navigate = useNavigate();
    return (
        <div
            className={'mt-42 items-center w-full px-1'}
            onClick={() => {
                navigate(`/conversations/${conversation.id}`);
            }}
            key={conversation.id}
        >
            <div
                className={`flex justify-start gap-2 py-2 px-4 rounded-lg  ${
                    conversation.id === parseInt(id!) ? '!bg-[#29323d]' : ''
                } hover:bg-[#1a1a1b] `}
            >
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

                <div className="flex flex-col flex-nowrap flex-1 break-all justify-center">
                    <span className="block font-bold text-base ">
                        {` ${getRecipient(conversation, user!).lastName} ${
                            getRecipient(conversation, user!).firstName
                        }`}
                    </span>
                    <div className="flex justify-start items-center">
                        <span className="text-md text-white">{lastMessageContent()}</span>
                        <span className="text-sm text-[#65676b] ml-3 font-semibold">
                            {moment(conversation?.lastMessageSentAt).fromNow(true)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
