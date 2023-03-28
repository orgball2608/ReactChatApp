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
import { useCurrentViewportView } from '../../hooks/useCurrentViewportView';

type Props = {
    conversation: Conversation;
};
export const ConversationSideBarItem: FC<Props> = ({ conversation }) => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const onlineFriends = useSelector((state: RootState) => state.friends.onlineFriends);
    const { isMobile,isTablet } = useCurrentViewportView();
    const recipientUser = getRecipient(conversation, user!);
    const { profile } = recipientUser;
    const isOnline = !!onlineFriends.find((friend) => friend.id === recipientUser.id);
    return (
        <div
            className={'mt-42 items-center w-full px-1'}
            onClick={() => {
                navigate(`/conversations/${conversation.id}`);
            }}
            key={conversation.id}
        >
            <div
                className={`flex justify-start gap-3 py-2 px-3 lg:rounded-lg rounded-md  relative  ${
                    conversation.id === parseInt(id!) ? '!bg-[#29323d]' : 'hover:bg-[#28282b] '
                }`}
            >
                <div className="h-12 w-12 flex-none rounded-full relative">
                    <LazyLoadImage
                        src={profile?.avatar || defaultAvatar}
                        alt={'profile'}
                        className="h-12 w-12 rounded-full flex-none object-cover "
                    />
                    {isOnline && (
                        <div className="w-[10px] h-[10px] rounded-full absolute bottom-0 right-1 bg-green-500 dot-ping"></div>
                    )}
                </div>

                <div className="flex flex-col flex-nowrap flex-1 break-all justify-center">
                    <div className="flex justify-between items-center gap-1">
                        <p className={`text-white font-semibold max-w-[100px] lg:max-w-[180px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap ${isMobile ? 'max-w-[260px]': ''}`}>{(isTablet) ? getFullName(user, conversation).split(' ').slice(1, -1).join(' ') : getFullName(user, conversation)}</p>
                        <p className="text-sm text-gray-400 font-semibold">{moment(conversation?.lastMessageSentAt).format('H:mm')}</p>
                    </div>
                    <p className={`max-w-[140px] lg:max-w-[220px] text-sm text-gray-400 flex-grow overflow-hidden text-ellipsis whitespace-nowrap ${isMobile ? 'max-w-[180px]': ''}`}>{lastMessageContent(conversation)}</p>
                </div>
                {
                    conversation && conversation.lastMessageSent && conversation.lastMessageSent.messageStatuses?.find((status: MessageStatus) => status.user.id === user?.id) ?<></>: <div className="absolute top-1/2 -translate-y-1/2 right-4 w-[10px] h-[10px] bg-[#0d90f3] rounded-full"></div>
                }
            </div>
        </div>
    );
};
