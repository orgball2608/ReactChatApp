import { Dispatch, FC, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../contex/AuthContext';
import { FriendRequestType, FriendType } from '../../utils/types';

type Props = {
    friend: FriendType | FriendRequestType;
    setVisible: Dispatch<React.SetStateAction<boolean>>;
};

export const FriendRequestMenuContext: FC<Props> = ({ friend, setVisible }) => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const FriendRequestMenuAction = [
        {
            action: 'Profile',
            label: 'Profile',
        },
    ];

    const recipient = friend.sender.id === user?.id ? friend.receiver : friend.sender;

    const handleFriendRequestMenuAction = (action: string) => {
        switch (action) {
            case 'Profile':
                if (parseInt(id!) === recipient.id) setVisible(false);
                else {
                    navigate(`/friend/profile/${recipient.id}`);
                    setVisible(false);
                }

                break;
            default:
                break;
        }
    };

    return (
        <div className="flex flex-col w-32 rounded-3xl justify-center">
            {FriendRequestMenuAction.map((item) => (
                <div
                    onClick={() => handleFriendRequestMenuAction(item.action)}
                    key={item.label}
                    className="text-white flex p-1 justify-start gap-4 text-base hover:bg-[#555454] rounded-md"
                >
                    <span className="font-normal text-base">{item.label}</span>
                </div>
            ))}
        </div>
    );
};
