import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SocketContext } from '../../contex/SocketContext';
import { AppDispatch } from '../../store';
import { WebsocketEvents } from '../../utils/constants';
import { resetState } from '../../store/callSlice';


export function useVoiceCallRejected() {
    const socket = useContext(SocketContext);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        socket.on(WebsocketEvents.VOICE_CALL_REJECTED, () => {
            dispatch(resetState());
        });

        return () => {
            socket.off(WebsocketEvents.VOICE_CALL_REJECTED);
        };
    }, [dispatch,socket]);
}