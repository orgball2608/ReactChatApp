import { FC, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SocketContext } from '../../contex/SocketContext';
import { AppDispatch } from '../../store';
import {
    friendRequestAccepted,
    friendRequestCancelled,
    friendRequestReceived,
    friendRequestRejected,
} from '../../store/friendSlice';
import { FriendLists } from '../friends/FriendLists';
import { FriendRequests } from '../friends/FriendRequests';

type Props = {
    selectedItem: string;
};

export const FriendSideBar: FC<Props> = ({ selectedItem }) => {
    const socket = useContext(SocketContext);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        socket.on('onFriendRequestReceived', (payload) => {
            dispatch(friendRequestReceived(payload));
        });
        socket.on('onFriendRequestAccepted', (payload) => {
            dispatch(friendRequestAccepted(payload));
        });
        socket.on('onFriendRequestRejected', (payload) => {
            dispatch(friendRequestRejected(payload));
        });
        socket.on('onFriendRequestCancelled', (payload) => {
            dispatch(friendRequestCancelled(payload));
        });
        return () => {
            socket.off('onFriendRequestReceived');
            socket.off('onFriendRequestAccepted');
            socket.off('onFriendRequestRejected');
            socket.off('onFriendRequestCancelled');
        };
    }, []);

    return (
        <div className="flex flex-col w-1/3 h-full border-border-conversations border-r-[1px]">
            {selectedItem === 'requests' && <FriendRequests />}
            {selectedItem === 'friends' && <FriendLists />}
        </div>
    );
};
