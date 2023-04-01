import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../contex/AuthContext';
import { SocketContext } from '../../contex/SocketContext';
import { AppDispatch, RootState } from '../../store';
import { WebsocketEvents } from '../../utils/constants';
import { AcceptedCallPayload } from '../../utils/types';
import {
    setActiveConversationId,
    setCall,
    setConnection,
    setIsCallInProgress,
    setIsReceivingCall,
} from '../../store/callSlice';

export function useVoiceCallAccepted() {
    const { user } = useContext(AuthContext);
    const socket = useContext(SocketContext);
    const dispatch = useDispatch<AppDispatch>();
    const { peer, localStream } = useSelector((state: RootState) => state.calls);

    useEffect(() => {
        socket.on(
            WebsocketEvents.VOICE_CALL_ACCEPTED,
            (data: AcceptedCallPayload) => {
                if (!peer) return console.log('AUDIO: No Peer');
                dispatch(setActiveConversationId(data.conversation.id));
                dispatch(setIsCallInProgress(true));
                dispatch(setIsReceivingCall(false));
                if (data.caller.id === user!.id) {
                    const connection = peer.connect(data.acceptor.peer.id);
                    dispatch(setConnection(connection));
                    if (!connection) return console.log('No connection');
                    if (localStream) {
                        const newCall = peer.call(data.acceptor.peer.id, localStream);
                        dispatch(setCall(newCall));
                    }
                }
            }
        );

        return () => {
            socket.off(WebsocketEvents.VOICE_CALL_ACCEPTED);
        };
    }, [localStream, peer,dispatch,socket]);
}