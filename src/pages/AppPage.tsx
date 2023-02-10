import { UserSideBar } from '../components/sidebars/UserSideBar';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { SocketContext } from '../contex/SocketContext';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contex/AuthContext';
import { fetchConversationsThunk } from '../store/coversationSlice';
import { updateOfflineFriends, updateOnlineFriends } from '../store/friendSlice';

export const AppPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const socket = useContext(SocketContext);
    const { user } = useContext(AuthContext);
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
        <div className="h-full flex flex-nowrap overflow-hidden">
            <UserSideBar />
            <Outlet />
            <ToastContainer />
        </div>
    );
};
