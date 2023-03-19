import { FC, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { SocketContext } from '../../contex/SocketContext';
import { AppDispatch } from '../../store';
import {
    deleteFriendUpdate,
    friendRequestAccepted,
    friendRequestCancelled,
    friendRequestReceived,
    friendRequestRejected,
    getReceiveFriendRequests,
    getSendFriendRequests,
} from '../../store/friendSlice';
import { changePage } from '../../store/selectedPageSlice';
import { FriendLists } from '../friends/FriendLists';
import { FriendRequests } from '../friends/FriendRequests';
import { useCurrentViewportView } from '../../hooks/useCurrentViewportView';

type Props = {
    selectedItem: string;
};

export const FriendSideBar: FC<Props> = ({ selectedItem }) => {
    const socket = useContext(SocketContext);
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();
    const { isMobile } = useCurrentViewportView();
    const selectedPath = location.pathname.split('/')[1];

    useEffect(() => {
        if (selectedPath === 'friend') dispatch(changePage('friend'));
    }, [selectedPath,dispatch]);

    useEffect(() => {
        dispatch(getSendFriendRequests());
        dispatch(getReceiveFriendRequests());
    }, [dispatch]);

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
        socket.on('onFriendRemoved', (payload) => {
            dispatch(deleteFriendUpdate(payload));
        });
        return () => {
            socket.off('onFriendRequestReceived');
            socket.off('onFriendRequestAccepted');
            socket.off('onFriendRequestRejected');
            socket.off('onFriendRequestCancelled');
            socket.off('onFriendRemoved');
        };
    }, [dispatch]);

    return (
        <div className={`flex flex-col flex-none w-80 h-full border-border-conversations border-r-[1px] ${isMobile?'!w-full':''}`}>
            {selectedItem === 'requests' && <FriendRequests />}
            {selectedItem === 'friends' && <FriendLists />}
        </div>
    );
};
