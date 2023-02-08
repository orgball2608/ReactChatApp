import { FC, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { SocketContext } from '../../contex/SocketContext';
import { AppDispatch } from '../../store';
import {
    friendRequestAccepted,
    friendRequestCancelled,
    friendRequestReceived,
    friendRequestRejected,
    getFriends,
    getReceiveFriendRequests,
    getSendFriendRequests,
} from '../../store/friendSlice';
import { changePage } from '../../store/selectedPageSlice';
import { FriendLists } from '../friends/FriendLists';
import { FriendRequests } from '../friends/FriendRequests';

type Props = {
    selectedItem: string;
};

export const FriendSideBar: FC<Props> = ({ selectedItem }) => {
    const socket = useContext(SocketContext);
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();
    const selectedPath = location.pathname.split('/')[1];

    useEffect(() => {
        if (selectedPath === 'friend') dispatch(changePage('friend'));
    }, [selectedPath]);

    useEffect(() => {
        dispatch(getSendFriendRequests());
        dispatch(getReceiveFriendRequests());
        dispatch(getFriends());
    }, []);

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
        <div className="flex flex-col flex-none w-88 h-full border-border-conversations border-r-[1px]">
            {selectedItem === 'requests' && <FriendRequests />}
            {selectedItem === 'friends' && <FriendLists />}
        </div>
    );
};
