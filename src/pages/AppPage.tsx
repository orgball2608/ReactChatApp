import { UserSideBar } from '../components/sidebars/UserSideBar';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { SocketContext } from '../contex/SocketContext';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contex/AuthContext';
import { fetchConversationsThunk } from '../store/coversationSlice';
import { getFriends, updateOfflineFriends, updateOnlineFriends } from '../store/friendSlice';
import { ImagePreviewModalContext } from '../contex/ImagePreviewModalContext';
import { ImagePreviewModal } from '../components/modals/ImagePreviewModal';
import { AttachmentType, SelectedPageType } from '../utils/types';
import { fetchGroupsThunk } from '../store/groupSlice';
import { useCurrentViewportView } from '../hooks/useCurrentViewportView';
import { changePage } from '../store/selectedPageSlice';

export const AppPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {pathname} = useLocation()
    const {id} = useParams<{id:string}>()
    const socket = useContext(SocketContext);
    const { user } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [attachment, setAttachment] = useState<AttachmentType | undefined>(undefined);
    const { isMobile } = useCurrentViewportView();
    const selectedPage = useSelector((state:RootState)=>state.selectedPage.page)

    //convert pathname and pressed type
    const conversationPathNameType = pathname.split('/')[1]
    let selectedPageType: SelectedPageType
    if (conversationPathNameType === "settings" || conversationPathNameType === "archives" || conversationPathNameType === "friends" || conversationPathNameType === "conversations") {
        selectedPageType = conversationPathNameType;
    }

    useEffect(()=>{
        if(conversationPathNameType !== selectedPage){
            dispatch(changePage(selectedPageType))
        }
    },[])

    useEffect(() => {
        dispatch(fetchConversationsThunk());
        dispatch(fetchGroupsThunk());
    }, [dispatch]);

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
    }, [dispatch]);


    return (
        <ImagePreviewModalContext.Provider value={{ setShowModal, showModal, attachment, setAttachment }}>
            {showModal && <ImagePreviewModal />}
            <div className="h-full flex flex-nowrap overflow-hidden relative">
                {((isMobile && !id) || !isMobile) && <UserSideBar /> }
                <Outlet />
                <ToastContainer />
            </div>
        </ImagePreviewModalContext.Provider>
    );
};
