import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { getFriends } from '../../store/friendSlice';
import { FriendItem } from './FriendItem';

export const FriendLists = () => {
    const dispatch = useDispatch<AppDispatch>();
    const friendRequests = useSelector((state: RootState) => state.friends.friends);
    useEffect(() => {
        dispatch(getFriends());
    }, []);
    return (
        <div className="flex p-6 w-full">
            {friendRequests.length > 0 && (
                <div className="flex flex-col justify-center gap-2">
                    {friendRequests.map((request) => (
                        <FriendItem friend={request} type={'friends'} key={request.id} />
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
