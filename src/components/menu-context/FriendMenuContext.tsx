import { Dispatch, FC, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '../../store';
import { createConversationThunk } from '../../store/coversationSlice';
import { deleteFriend } from '../../store/friendSlice';
import { changePage } from '../../store/selectedPageSlice';
import { changeType } from '../../store/typeSlice';
import { User } from '../../utils/types';

type Props = {
    friend: User;
    setVisible: Dispatch<SetStateAction<boolean>>;
};

export const FriendMenuContext: FC<Props> = ({ friend, setVisible }) => {
    const conversations = useSelector((state: RootState) => state.conversation.conversations);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const exitsConversation = conversations.find(
        (conversation) => conversation.creator.id === friend.id || conversation.recipient.id === friend.id,
    );
    const conversationType = useSelector((state: RootState) => state.type.type);
    const FriendMenuAction = [
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
                            email: friend.email,
                            message: '',
                        }),
                    )
                        .unwrap()
                        .then(({ data }) => {
                            if (conversationType === 'group') dispatch(changeType('private'));
                            navigate(`../conversations/${data.id}`);
                        })
                        .catch((err) => console.log(err));
                }
                break;

            // case 'Profile':
            //     if (parseInt(id!) === friend.id) setVisible(false);
            //     else {
            //         navigate(`/friend/profile/${friend.id}`);
            //         setVisible(false);
            //     }
            //     break;
            case 'Remove':
                dispatch(deleteFriend(friend.id))
                    .unwrap()
                    .then(() => {
                        setVisible(false);
                        toast.clearWaitingQueue();
                        toast.success('Remove friend successfully');
                    })
                    .catch((err) => {
                        toast.clearWaitingQueue();
                        toast.error(err.message);
                    });
                break;
            default:
                break;
        }
    };

    return (
        <div className="flex flex-col w-32 rounded-3xl justify-center">
            {FriendMenuAction.map((item) => (
                <div
                    onClick={() => handleFriendMenuAction(item.action)}
                    key={item.label}
                    className="text-white flex py-1 px-2 justify-start gap-4 text-base hover:bg-[#555454] rounded-md"
                >
                    <span className="font-normal text-base">{item.label}</span>
                </div>
            ))}
        </div>
    );
};
