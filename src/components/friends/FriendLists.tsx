import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FriendItem } from './FriendItem';

export const FriendLists = () => {
    const onlineFriends = useSelector((state: RootState) => state.friends.onlineFriends);
    const offlineFriends = useSelector((state: RootState) => state.friends.offlineFriends);
    return (
        <div className="flex flex-col mt-2 px-1 w-full">
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
                <div className="flex justify-center items-start px-5 gap-2 w-full">
                    <p className="text-gray-400 text-base">No friends yet</p>
                </div>
            )}
        </div>
    );
};
