import { UserSideBar } from '../components/sidebars/UserSideBar';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { SocketContext } from '../contex/SocketContext';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contex/AuthContext';
import { fetchConversationsThunk } from '../store/coversationSlice';
import { getFriends, updateOfflineFriends, updateOnlineFriends } from '../store/friendSlice';
import { ImagePreviewModalContext } from '../contex/ImagePreviewModalContext';
import { ImagePreviewModal } from '../components/modals/ImagePreviewModal';
import { AttachmentType } from '../utils/types';
import { fetchGroupsThunk } from '../store/groupSlice';

export const AppPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const socket = useContext(SocketContext);
    const { user } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [attachment, setAttachment] = useState<AttachmentType | undefined>(undefined);

    useEffect(() => {
        dispatch(fetchConversationsThunk());
        dispatch(fetchGroupsThunk());
    }, []);

    useEffect(() => {
        socket.emit('getOnlineFriends', { user });
        const interval = setInterval(() => {
            socket.emit('getOnlineFriends', { user });
        }, 10000);
        socket.on('getStatusFriends', (payload) => {
            dispatch(updateOfflineFriends(payload.offlineFriends));
            dispatch(updateOnlineFriends(payload.onlineFriends));
        });
        dispatch(getFriends());
        return () => {
            clearInterval(interval);
            socket.off('getStatusFriends');
            dispatch(updateOfflineFriends([]));
            dispatch(updateOnlineFriends([]));
        };
    }, []);
    return (
        <ImagePreviewModalContext.Provider value={{ setShowModal, showModal, attachment, setAttachment }}>
            {showModal && <ImagePreviewModal />}
            <div className="h-full flex flex-nowrap overflow-hidden">
                <UserSideBar />
                <Outlet />
                <ToastContainer />
            </div>
        </ImagePreviewModalContext.Provider>
    );
};
