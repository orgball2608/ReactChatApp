import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { FriendPageHeader } from '../../components/friends/FriendPageHeader';
import { FriendPanel } from '../../components/friends/FriendPanel';
import { FriendSideBar } from '../../components/sidebars/FriendSideBar';
import { AuthContext } from '../../contex/AuthContext';
import { SocketContext } from '../../contex/SocketContext';
import { AppDispatch, RootState } from '../../store';
import { fetchConversationsThunk } from '../../store/coversationSlice';
import { updateOfflineFriends, updateOnlineFriends } from '../../store/friendSlice';

export const FriendPageLayout = () => {
    const { id } = useParams<{ id: string }>();
    const [selectedItem, setSelectedItem] = useState<string>('friends');
    const dispatch = useDispatch<AppDispatch>();
    const socket = useContext(SocketContext);
    const { user } = useContext(AuthContext);
    const { onlineFriends, offlineFriends } = useSelector((state: RootState) => state.friends);
    useEffect(() => {
        dispatch(fetchConversationsThunk());
        socket.emit('getOnlineFriends', { user });
        const interval = setInterval(() => {
            socket.emit('getOnlineFriends', { user });
        }, 10000);
        socket.on('getStatusFriends', (payload) => {
            dispatch(updateOfflineFriends(payload.offlineFriends));
            dispatch(updateOnlineFriends(payload.onlineFriends));
        });
        return () => {
            clearInterval(interval);
            socket.off('getStatusFriends');
            dispatch(updateOfflineFriends([]));
            dispatch(updateOnlineFriends([]));
        };
    }, []);
    return (
        <div className="flex flex-col bg-dark-light h-full w-full overflow-hidden">
            <FriendPageHeader selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            <div className="flex h-full w-full">
                <FriendSideBar
                    selectedItem={selectedItem}
                    onlineFriends={onlineFriends}
                    offlineFriends={offlineFriends}
                />
                {!id && <FriendPanel />}
                <Outlet />
            </div>
        </div>
    );
};
