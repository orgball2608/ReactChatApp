import { useDispatch, useSelector } from 'react-redux';
import {
    acceptFriendRequestReceive,
    cancelFriendRequestSend,
    rejectFriendRequestReceive,
} from '../../store/friendSlice';
import { AppDispatch, RootState } from '../../store';
import { Check, Cross } from 'akar-icons';
import { toast } from 'react-toastify';
import { FriendRequestType } from '../../utils/types';
import { FriendRequestItem } from './FriendRequestItem';

export const FriendRequests = () => {
    const dispatch = useDispatch<AppDispatch>();
    const friendReceiveRequests = useSelector((state: RootState) => state.friends.receiveRequests);
    const friendSendRequests = useSelector((state: RootState) => state.friends.sendRequests);

    const handleRejectFriendRequestReceive = (id: number) => {
        dispatch(rejectFriendRequestReceive(id))
            .unwrap()
            .then(() => {
                toast.success('Reject friend request successfully');
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    const handleAcceptFriendRequestReceive = (id: number) => {
        dispatch(acceptFriendRequestReceive(id))
            .unwrap()
            .then(() => {
                toast.success('Accept friend request successfully');
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    const handleCancleFriendRequestSend = (id: number) => {
        dispatch(cancelFriendRequestSend(id))
            .unwrap()
            .then(() => {
                toast.success('Cancle friend request successfully');
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    return (
        <div className="flex flex-col px-6 mt-2 w-full h-full gap-4 overflow-y-auto">
            <div className="flex flex-col gap-2">
                <span className="font-normal text-sm text-white">Receive Requests</span>
                <div className="flex flex-col gap-3 w-full h-full cursor-pointer">
                    {friendReceiveRequests.length > 0 ? (
                        friendReceiveRequests.map((request: FriendRequestType) => (
                            <div key={request.id} className="flex justify-between items-center">
                                <FriendRequestItem friend={request} />
                                <div className="flex justify-center items-start gap-2">
                                    <div
                                        onClick={() => handleAcceptFriendRequestReceive(request.id)}
                                        className="rounded-full p-1 bg-[#302e2e] flex items-center justify-center hover:text-green-600"
                                    >
                                        <Check size={20} />
                                    </div>
                                    <div
                                        onClick={() => handleRejectFriendRequestReceive(request.id)}
                                        className="rounded-full p-1 bg-[#302e2e] flex items-center justify-center hover:text-red-600"
                                    >
                                        <Cross size={18} />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 flex justify-center text-sm">No friend request yet</p>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <span className="font-normal text-sm text-white">Send Requests</span>
                <div className="flex flex-col gap-3 w-full h-full cursor-pointer">
                    {friendSendRequests.length > 0 ? (
                        friendSendRequests.map((request) => (
                            <div key={request.id} className="flex justify-between items-center">
                                <FriendRequestItem friend={request} />
                                <div className="flex justify-center items-start gap-2">
                                    <div
                                        onClick={() => handleCancleFriendRequestSend(request.id)}
                                        className="rounded-full p-1 bg-[#1e1e1e] flex items-center justify-center hover:text-red-600"
                                    >
                                        <Cross size={18} />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 flex justify-center text-sm">No send friend request yet</p>
                    )}
                </div>
            </div>
        </div>
    );
};
