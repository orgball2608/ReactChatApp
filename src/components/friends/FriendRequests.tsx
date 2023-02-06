import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendRequests } from '../../store/friendSlice';
import { AppDispatch, RootState } from '../../store';
import { FriendItem } from './FriendItem';
import { Check, Cross } from 'akar-icons';

export const FriendRequests = () => {
    const dispatch = useDispatch<AppDispatch>();
    const friendRequests = useSelector((state: RootState) => state.friends.requests);
    useEffect(() => {
        dispatch(getFriendRequests());
    }, []);
    return (
        <div className="flex p-6 w-full h-full">
            <div className="flex flex-col gap-3 w-full h-full">
                {friendRequests.map((request) => (
                    <div className="flex justify-between items-center">
                        <FriendItem friend={request} type={'friends'} />
                        <div className="flex justify-center items-start gap-2">
                            <div className="rounded-full w-6 h-6 bg-[#1e1e1e] flex items-center justify-center hover:text-green-600">
                                <Check size={20} />
                            </div>
                            <div className="rounded-full w-6 h-6 bg-[#1e1e1e] flex items-center justify-center hover:text-red-600">
                                <Cross size={20} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};