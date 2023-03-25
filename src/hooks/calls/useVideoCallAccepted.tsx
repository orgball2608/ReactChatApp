import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../contex/AuthContext';
import { SocketContext } from '../../contex/SocketContext';
import { AppDispatch, RootState } from '../../store';
import { WebsocketEvents } from '../../utils/constants';
import { AcceptedCallPayload } from '../../utils/types';
import { setCall, setConnection, setIsCallInProgress, setIsReceivingCall } from '../../store/callSlice';

export function useVideoCallAccepted() {
    const { user } = useContext(AuthContext);
    const socket = useContext(SocketContext);
    const dispatch = useDispatch<AppDispatch>();
    const { peer, localStream } = useSelector((state: RootState) => state.calls);

    useEffect(() => {
        socket.on(WebsocketEvents.VIDEO_CALL_ACCEPTED, (data: AcceptedCallPayload) => {
            console.log('video call was accepted!');
            dispatch(setIsCallInProgress(true));
            dispatch(setIsReceivingCall(false));
            if (!peer) return console.log('No peer....');
            if (data.caller.id === user!.id) {
                const connection = peer.connect(data.acceptor.peer.id);
                dispatch(setConnection(connection));
                if(localStream){
                    const newCall = peer.call(data.acceptor.peer.id, localStream);
                    dispatch(setCall(newCall));
                }

            }
        });

        return () => {
            socket.off(WebsocketEvents.VIDEO_CALL_ACCEPTED);
        };
    }, [localStream, peer,dispatch,socket]);
}