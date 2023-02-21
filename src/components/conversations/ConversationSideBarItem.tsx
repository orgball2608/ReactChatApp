import { Conversation } from '../../utils/types';
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

    const isOnline = onlineFriends.find((friend) => friend.id === recipientUser.id) ? true : false;

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

                <div className="flex flex-col flex-nowrap flex-1 font-normal break-all justify-center">
                    <span className="block font-semibold text-base">{getFullName(user, conversation)}</span>
                    <div className="flex justify-start items-center">
                        <span className="text-md text-white">{lastMessageContent(conversation)}</span>
                        <span className="text-sm text-[#65676b] ml-3 font-semibold">
                            {moment(conversation?.lastMessageSentAt).format('H:mm')}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
