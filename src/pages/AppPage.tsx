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
import { resetState, setCall, setLocalStream, setPeer, setRemoteStream } from '../store/callSlice';
import Peer from 'peerjs';
import { CallReceiveDialog } from '../components/calls/CallReceiveDialog';
import { useVoiceCall } from '../hooks/calls/useVoiceCall';
import { useVideoCall } from '../hooks/calls/useVideoCall';
import { WebsocketEvents } from '../utils/constants';
import { CallPage } from './calls/CallPage';
import { useVoiceCallAccepted } from '../hooks/calls/useVoiceCallAccepted';
import { useVoiceCallRejected } from '../hooks/calls/useVoiceCallRejected';
import { useVideoCallAccepted } from '../hooks/calls/useVideoCallAccepted';
import { useVideoCallRejected } from '../hooks/calls/useVideoCallRejected';
import { useVoiceCallHangUp } from '../hooks/calls/useVoiceCallHangUp';
import { useVideoCallHangUp } from '../hooks/calls/useVideoCallHangUp';

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
    const { isReceivingCall,call,localStream,peer,callType } = useSelector(
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
        socket.on(WebsocketEvents.VIDEO_CALL_HANG_UP, () => {
            dispatch(resetState());
        })
        socket.on(WebsocketEvents.VOICE_CALL_HANG_UP, () => {
            dispatch(resetState());
        })
        return () => {
            clearInterval(interval);
            socket.off('getStatusFriends');
            socket.off(WebsocketEvents.VIDEO_CALL_HANG_UP);
            socket.off(WebsocketEvents.VOICE_CALL_HANG_UP);
            dispatch(updateOfflineFriends([]));
            dispatch(updateOnlineFriends([]));
        };
    }, [dispatch]);


    useEffect(() => {
        if (!peer) return;
        peer.on('call',async (incomingCall:any) => {
            const constraints = { video: callType === 'video', audio: true };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            incomingCall.answer(stream);
            dispatch(setLocalStream(stream));
            dispatch(setCall(incomingCall));
        });
        return () => {
            peer.off('call');
        };
    }, [peer,callType,dispatch]);

    useEffect(() => {
        if (!call) return;
        call.on('stream', (remoteStream:any) => {
            dispatch(setRemoteStream(remoteStream));
        });
        return () => {
            call.off('stream');
        };
    }, [call,dispatch]);


    useVoiceCall()
    useVideoCall()
    useVoiceCallAccepted();
    useVoiceCallRejected();
    useVideoCallAccepted()
    useVideoCallRejected()
    useVoiceCallHangUp();
    useVideoCallHangUp()

    return (
        <ImagePreviewModalContext.Provider value={{ setShowModal, showModal, attachment, setAttachment }}>
            {showModal && <ImagePreviewModal />}
            <div className="h-full flex flex-nowrap overflow-hidden relative">
                {(isReceivingCall && !call)  && <CallReceiveDialog/> }
                {((isMobile && !id) || !isMobile)&& <UserSideBar /> }
                <Outlet />
                <ToastContainer />
                {
                    localStream &&  <div className="w-full h-full bg-dark-light fixed left-0 top-0 flex justify-center items-center z-50">
                        <CallPage/>
                    </div>
                }
            </div>
        </ImagePreviewModalContext.Provider>
    );
};
