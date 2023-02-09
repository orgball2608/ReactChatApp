import { Dispatch, FC, SetStateAction, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contex/AuthContext';
import { AppDispatch } from '../../store';
import { deleteFriend } from '../../store/friendSlice';
import { FriendRequestType, FriendType } from '../../utils/types';

type Props = {
    friend: FriendType | FriendRequestType | undefined;
    setVisible: Dispatch<SetStateAction<boolean>>;
};

export const ProfileActionMenuContext: FC<Props> = ({ friend, setVisible }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useContext(AuthContext);
    const recipient = friend?.receiver.id === user?.id ? friend?.sender : friend?.receiver;
    const ProfileAction = [
        {
            action: 'Remove',
            label: 'Remove',
        },
    ];
    const handleProfileMenuAction = (action: string) => {
        switch (action) {
            case 'Remove':
                if (!recipient) return;
                dispatch(deleteFriend(recipient.id))
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
        }
    };
    return (
        <div className="flex flex-col w-32 rounded-3xl justify-center">
            {ProfileAction.map((item) => (
                <div
                    onClick={() => handleProfileMenuAction(item.action)}
                    key={item.label}
                    className="text-white flex p-1 justify-start gap-4 text-base hover:bg-[#959292] rounded-md font-semibold"
                >
                    <span>{item.label}</span>
                </div>
            ))}
        </div>
    );
};
