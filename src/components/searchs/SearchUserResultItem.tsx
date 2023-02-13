import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { User } from '../../utils/types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getDisplayName } from '../../utils/helpers';
import defaultAvatar from '../../__assets__/default_avatar.jpg';
import { useNavigate } from 'react-router-dom';
import { createConversationThunk } from '../../store/coversationSlice';
import { changeType } from '../../store/typeSlice';

type Props = {
    user: User;
};

export const SearchUserResultItem: FC<Props> = ({ user }) => {
    const onlineFriends = useSelector((state: RootState) => state.friends.onlineFriends);
    const MAX_MESSAGE_LENGTH = 30;
    const isOnline = onlineFriends.find((friend) => friend.id === user.id) ? true : false;
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const conversationType = useSelector((state: RootState) => state.type.type);
    const { profile } = user;
    const conversations = useSelector((state: RootState) => state.conversation.conversations);

    const conversation = conversations.find(
        (conversation) => conversation.creator.id === user.id || conversation.recipient.id === user.id,
    );

    const lastMessageContent = () => {
        const { lastMessageSent } = conversation!;
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

    const handleNavigateToConversation = () => {
        if (conversation) navigate(`/conversations/${conversation.id}`);
        else {
            dispatch(
                createConversationThunk({
                    email: user?.email,
                    message: 'test',
                }),
            )
                .unwrap()
                .then(({ data }) => {
                    if (conversationType === 'group') dispatch(changeType('private'));
                    navigate(`/conversations/${data.id}`);
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div
            onClick={handleNavigateToConversation}
            className="flex justify-start gap-5 mx-6 py-3 box-border border-b-[1px] border-solid border-border-conversations"
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
            <div className="flex flex-col flex-nowrap flex-1 break-all">
                <span className="block font-bold text-base ">{` ${getDisplayName(user)}`}</span>
                <span className="text-sm text-white">{conversation && lastMessageContent()}</span>
            </div>
        </div>
    );
};
