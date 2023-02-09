import { FC } from 'react';
import { User } from '../../utils/types';
import { FriendItem } from './FriendItem';

type Props = {
    onlineFriends: User[];
    offlineFriends: User[];
};

export const FriendLists: FC<Props> = ({ onlineFriends, offlineFriends }) => {
    return (
        <div className="flex flex-col py-6 px-1 w-full">
            <div className="flex flex-col gap-2 w-full">
                {onlineFriends.length > 0 && (
                    <div className="flex flex-col justify-center gap-2 w-full">
                        {onlineFriends.map((request) => (
                            <FriendItem friend={request} key={request.id} isOnline={true} />
                        ))}
                    </div>
                )}
                {offlineFriends.length > 0 && (
                    <div className="flex flex-col justify-center gap-2 w-full">
                        {offlineFriends.map((request) => (
                            <FriendItem friend={request} key={request.id} isOnline={false} />
                        ))}
                    </div>
                )}
            </div>

            {onlineFriends.length + offlineFriends.length === 0 && (
                <div className="flex flex-col justify-center items-start px-5 gap-2 w-full">
                    <p className="text-gray-500">No friends yet</p>
                </div>
            )}
        </div>
    );
};
