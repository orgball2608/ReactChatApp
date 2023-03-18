import { Conversation, MessageStatus } from '../../utils/types';
import { useNavigate, useParams } from 'react-router-dom';
import { FC, useContext } from 'react';
import { AuthContext } from '../../contex/AuthContext';
import { defaultAvatar } from '../../utils/constants';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import moment from 'moment';
import { getFullName, getRecipient, lastMessageContent } from '../../utils/helpers';

type Props = {
    conversation: Conversation;
};
export const ConversationSideBarItem: FC<Props> = ({ conversation }) => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const onlineFriends = useSelector((state: RootState) => state.friends.onlineFriends);

    const recipientUser = getRecipient(conversation, user!);
    const { profile } = recipientUser;

    const isOnline = !!onlineFriends.find((friend) => friend.id === recipientUser.id);

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
                className={`flex justify-start gap-2 py-2 px-4 rounded-lg relative  ${
                    conversation.id === parseInt(id!) ? '!bg-[#29323d]' : 'hover:bg-[#28282b] '
                }`}
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
                    <p className="text-white font-medium">{getFullName(user, conversation)}</p>
                    <p className="text-sm text-gray-400 max-w-[240px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap">{lastMessageContent(conversation)} • {moment(conversation?.lastMessageSentAt).format('H:mm')}</p>
                </div>
                {
                    conversation && conversation.lastMessageSent.messageStatuses?.find((status: MessageStatus) => status.user.id === user?.id) ?<></>: <div className="absolute top-1/2 -translate-y-1/2 right-4 w-[10px] h-[10px] bg-[#0d90f3] rounded-full"></div>
                }
            </div>
        </div>
    );
};
