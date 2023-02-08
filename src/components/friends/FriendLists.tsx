import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FriendItem } from './FriendItem';

export const FriendLists = () => {
    const friendRequests = useSelector((state: RootState) => state.friends.friends);

    return (
        <div className="flex py-6 px-1 w-full">
            {friendRequests.length > 0 && (
                <div className="flex flex-col justify-center gap-2 w-full">
                    {friendRequests.map((request) => (
                        <FriendItem friend={request} key={request.id} />
                    ))}
                </div>
            )}
            {friendRequests.length === 0 && (
                <div className="flex flex-col justify-center gap-2">
                    <p className="text-gray-500">No friends yet</p>
                </div>
            )}
        </div>
    );
};
