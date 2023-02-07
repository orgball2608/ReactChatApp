import { FC, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contex/AuthContext';
import { AppDispatch, RootState } from '../../store';
import { createConversationThunk } from '../../store/coversationSlice';
import { changePage } from '../../store/selectedPageSlice';
import { changeType } from '../../store/typeSlice';
import { FriendRequestType, FriendType } from '../../utils/types';

type Props = {
    friend: FriendType | FriendRequestType;
};

export const FriendMenuContext: FC<Props> = ({ friend }) => {
    const conversations = useSelector((state: RootState) => state.conversation.conversations);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { sender, receiver } = friend;
    const recipient = sender === user ? receiver : sender;
    const exitsConversation = conversations.find(
        (conversation) => conversation.creator.id === recipient.id || conversation.recipient.id === recipient.id,
    );
    const conversationType = useSelector((state: RootState) => state.type.type);
    const FriendMenuAction = [
        {
            action: 'Profile',
            label: 'Profile',
        },
        {
            action: 'Message',
            label: 'Message',
        },
        {
            action: 'Remove',
            label: 'Remove',
        },
    ];

    const handleFriendMenuAction = (action: string) => {
        switch (action) {
            case 'Message':
                if (exitsConversation) {
                    navigate(`../conversations/${exitsConversation.id}`, { replace: true });
                    dispatch(changePage('conversations'));
                    if (conversationType === 'group') dispatch(changeType('private'));
                } else {
                    dispatch(
                        createConversationThunk({
                            email: recipient.email,
                            message: '',
                        }),
                    )
                        .unwrap()
                        .then(({ data }) => {
                            navigate(`../conversations/${data.id}`);
                        })
                        .catch((err) => console.log(err));
                }
        }
    };

    return (
        <div className="flex flex-col w-32 rounded-3xl justify-center">
            {FriendMenuAction.map((item) => (
                <div
                    onClick={() => handleFriendMenuAction(item.action)}
                    key={item.label}
                    className="text-white flex p-1 justify-start gap-4 text-base hover:bg-[#959292] rounded-md"
                >
                    <span>{item.label}</span>
                </div>
            ))}
        </div>
    );
};
