import { Dispatch, FC } from 'react';
import { FriendRequestType, FriendType } from '../../utils/types';

type Props = {
    request: FriendType | FriendRequestType | undefined;
    setVisible: Dispatch<React.SetStateAction<boolean>>;
    handleAcceptFriend: () => void;
    handleRejectFriendRequest: () => void;
};

export const FriendRequestResponse: FC<Props> = ({
    setVisible,
    handleAcceptFriend,
    handleRejectFriendRequest,
}) => {
    const FriendRequestResponseMenuAction = [
        {
            action: 'Accept',
            label: 'Accept',
        },
        {
            action: 'Reject',
            label: 'Reject',
        },
    ];

    const handleFriendRequestMenuAction = (action: string) => {
        if (action === 'Accept') {
            handleAcceptFriend();
        } else if (action === 'Reject') {
            handleRejectFriendRequest();
        }
        setVisible(false);
    };

    return (
        <div className="flex flex-col w-32 rounded-3xl justify-center">
            {FriendRequestResponseMenuAction.map((item) => (
                <div
                    onClick={() => handleFriendRequestMenuAction(item.action)}
                    key={item.label}
                    className="text-white flex p-1 justify-start gap-4 text-base hover:bg-[#555454] rounded-md"
                >
                    <span className="text-base">{item.label}</span>
                </div>
            ))}
        </div>
    );
};
