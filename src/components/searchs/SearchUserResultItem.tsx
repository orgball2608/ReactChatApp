import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { User } from '../../utils/types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getDisplayName, lastMessageContent } from '../../utils/helpers';
import { defaultAvatar } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { createConversationThunk } from '../../store/coversationSlice';
import { changeType } from '../../store/typeSlice';
import moment from 'moment';

type Props = {
    user: User;
};

export const SearchUserResultItem: FC<Props> = ({ user }) => {
    const onlineFriends = useSelector((state: RootState) => state.friends.onlineFriends);
    const isOnline = onlineFriends.find((friend) => friend.id === user.id) ? true : false;
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const conversationType = useSelector((state: RootState) => state.type.type);
    const { profile } = user;
    const conversations = useSelector((state: RootState) => state.conversation.conversations);

    const conversation = conversations.find(
        (conversation) => conversation.creator.id === user.id || conversation.recipient.id === user.id,
    );

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
            className="flex justify-start gap-1 mx-2 py-2 box-border hover:bg-[#28282b] rounded-md "
        >
            <div className=" mx-2 h-12 w-12 rounded-full relative">
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
                <span className="block font-normal text-base">{` ${getDisplayName(user)}`}</span>
                <div className="flex items-center">
                    <span className="text-sm text-[#65676b]">{conversation && lastMessageContent(conversation)}</span>
                    <span className="text-sm text-[#65676b] ml-3">
                        {moment(conversation?.lastMessageSentAt).format('H:mm')}
                    </span>
                </div>
            </div>
        </div>
    );
};
