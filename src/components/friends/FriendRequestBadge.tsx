import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const FriendRequestBadge = () => {
    const friendRequest = useSelector((state: RootState) => state.friends.receiveRequests);
    const friendRequestCount = friendRequest.length;
    if (friendRequestCount === 0) return null;
    return (
        <div className="absolute top-1 right-1 bg-red-600 w-4 h-4 flex justify-center items-center rounded">
            <span className="text-white font-medium text-base">{friendRequestCount}</span>
        </div>
    );
};
