import { CallScreen } from '../../components/calls/CallScreen';
import {
    resetState,
    setCall,
    setConnection,
    setIsCallInProgress,
    setIsReceivingCall,
    setLocalStream,
    setRemoteStream,
} from '../../store/callSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { useContext, useEffect } from 'react';
import { AcceptedVideoCallPayload } from '../../utils/types';
import { AuthContext } from '../../contex/AuthContext';
import { SocketContext } from '../../contex/SocketContext';
import { useNavigate } from 'react-router-dom';

export const CallPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { peer, call, activeConversationId, connection,localStream,remoteStream } = useSelector(
        (state: RootState) => state.calls
    );
    const socket = useContext(SocketContext);

    useEffect(() => {
        if (!peer) return;
        peer.on('call',async (incomingCall:any) => {
            const constraints = { video: true, audio: true };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            incomingCall.answer(stream);
            dispatch(setLocalStream(stream));
            dispatch(setCall(incomingCall));
        });
    }, [peer,dispatch]);

    useEffect(() => {
        if (!call) return;
        call.on('stream', (remoteStream:any) => {
            console.log('received remote stream');
            dispatch(setRemoteStream(remoteStream));
        });
        call.on('close', () => {
            console.log('call was closed');
        });
        return () => {
            call.off('stream');
            call.off('close');
        };
    }, [call,dispatch]);

    useEffect(() => {
        socket.on('onVideoCallAccept', (data: AcceptedVideoCallPayload) => {
            console.log('video call was accepted!');
            dispatch(setIsCallInProgress(true));
            dispatch(setIsReceivingCall(false));
            if (!peer) return console.log('No peer....');
            if (data.caller.id === user!.id) {
                const connection = peer.connect(data.acceptor.peer.id);
                dispatch(setConnection(connection));
                navigator.mediaDevices
                    .getUserMedia({
                        video: true,
                        audio: true,
                    })
                    .then((stream) => {
                        const newCall = peer.call(data.acceptor.peer.id, stream);
                        dispatch(setCall(newCall));
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });

        return () => {
            socket.off('onVideoCallAccept');
        };
    }, [peer]);


    useEffect(() => {
        socket.on('onVideoCallRejected', () => {
            navigate(`../conversations/${activeConversationId}`)
            dispatch(resetState());
        });
        return () => {
            socket.off('onVideoCallRejected');
        };
    },[])

    useEffect(() => {
        socket.on('onVideoCallHangUp', () => {
            console.log('received onVideoCallHangUp')
            localStream&&
            localStream.getTracks().forEach((track) => {
                track.stop();
            })
            const localTrack = localStream?.getVideoTracks()[0];
            localTrack?.stop();
            remoteStream &&
            remoteStream.getTracks().forEach((track) => {
                track.stop();
            });
            const remoteTrack = remoteStream?.getVideoTracks()[0];
            remoteTrack?.stop();
            call && call.close();
            connection && connection.close();
            navigate(`../conversations/${activeConversationId}`)
            dispatch(resetState());
        });

        return () => {
            socket.off('onVideoCallHangUp');
        };
    }, [call,remoteStream, localStream]);

   return <div className="relative w-full h-full">
            <CallScreen/>
   </div>
}