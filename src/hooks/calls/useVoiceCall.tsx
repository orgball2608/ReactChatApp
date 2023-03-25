import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../../contex/SocketContext';
import { AppDispatch, RootState } from '../../store';
import { AuthContext } from '../../contex/AuthContext';
import { WebsocketEvents } from '../../utils/constants';
import { CallPayload } from '../../utils/types';
import { setCaller, setCallType, setIsReceivingCall, setReceiver } from '../../store/callSlice';

export function useVoiceCall() {
    const socket = useContext(SocketContext);
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useContext(AuthContext);
    const { isReceivingCall } = useSelector((state: RootState) => state.calls);

    useEffect(() => {
        socket.on(WebsocketEvents.VOICE_CALL, (data: CallPayload) => {
            if (isReceivingCall) return;
            dispatch(setCaller(data.caller));
            dispatch(setReceiver(user!));
            dispatch(setIsReceivingCall(true));
            dispatch(setCallType('audio'));
        });

        return () => {
            socket.off(WebsocketEvents.VOICE_CALL);
        };
    }, [isReceivingCall,dispatch,socket]);
}