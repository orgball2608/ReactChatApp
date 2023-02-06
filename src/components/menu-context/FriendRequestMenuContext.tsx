import { FC } from 'react';
import { FriendRequestType, FriendType } from '../../utils/types';

type Props = {
    friend: FriendType | FriendRequestType;
};

export const FriendRequestMenuContext: FC<Props> = ({ friend }) => {
    const FriendRequestMenuAction = [
        {
            action: 'Remove',
            label: 'Remove',
        },
        {
            action: 'Profile',
            label: 'Profile',
        },
    ];
    return (
        <div className="flex flex-col w-32 rounded-3xl justify-center">
            {FriendRequestMenuAction.map((item) => (
                <div
                    key={item.label}
                    className="text-white flex p-1 justify-start gap-4 text-base hover:bg-[#959292] rounded-md"
                >
                    <span>{item.label}</span>
                </div>
            ))}
        </div>
    );
};
