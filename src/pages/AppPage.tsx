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
import { AttachmentType, SelectedPageType, VideoCallPayload } from '../utils/types';
import { fetchGroupsThunk } from '../store/groupSlice';
import { useCurrentViewportView } from '../hooks/useCurrentViewportView';
import { changePage } from '../store/selectedPageSlice';
import {
    resetState,
    setActiveConversationId,
    setCaller,
    setIsReceivingCall,
    setPeer,
    setReceiver,
} from '../store/callSlice';
import Peer from 'peerjs';
import { CallReceiveDialog } from '../components/calls/CallReceiveDialog';

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
    const { isReceivingCall,call,activeConversationId } = useSelector(
        (state: RootState) => state.calls
    );
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
        dispatch(getFriends());
    }, [dispatch]);

    useEffect(()=>{
        if (!user) return;
        const newPeer = new Peer(user.peer.id,{
            config: {
                iceServers: [
                    {
                        url: 'stun:stun.l.google.com:19302',
                    },
                    {
                        url: 'stun:stun1.l.google.com:19302',
                    },
                ],
            },
        });
        dispatch(setPeer(newPeer));
    },[dispatch])

    useEffect(() => {
        socket.emit('getOnlineFriends', { user });
        const interval = setInterval(() => {
            socket.emit('getOnlineFriends', { user });
        }, 10000);
        socket.on('getStatusFriends', (payload) => {
            dispatch(updateOfflineFriends(payload.offlineFriends));
            dispatch(updateOnlineFriends(payload.onlineFriends));
        });
        socket.on('onVideoCall', (data: VideoCallPayload) => {
            dispatch(setCaller(data.caller))
            dispatch(setIsReceivingCall(true))
            dispatch(setReceiver(user!))
            dispatch(setActiveConversationId(data.conversationId))
        });
        socket.on('onVideoCallHangUp', () => {
            console.log('onVideoCallHangUp');
            dispatch(resetState());
        })
        return () => {
            clearInterval(interval);
            socket.off('getStatusFriends');
            socket.off('onVideoCall')
            socket.off('onVideoCallHangUp');
            dispatch(updateOfflineFriends([]));
            dispatch(updateOnlineFriends([]));
        };
    }, [dispatch]);

    return (
        <ImagePreviewModalContext.Provider value={{ setShowModal, showModal, attachment, setAttachment }}>
            {showModal && <ImagePreviewModal />}
            <div className="h-full flex flex-nowrap overflow-hidden relative">
                {(isReceivingCall && !call)  && <CallReceiveDialog/> }
                {(((isMobile && !id) || !isMobile) && !activeConversationId) && <UserSideBar /> }
                <Outlet />
                <ToastContainer />
            </div>
        </ImagePreviewModalContext.Provider>
    );
};
