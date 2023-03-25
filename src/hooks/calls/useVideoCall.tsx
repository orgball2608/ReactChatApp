import { useContext, useEffect } from 'react';
import { SocketContext } from '../../contex/SocketContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { AuthContext } from '../../contex/AuthContext';
import { WebsocketEvents } from '../../utils/constants';
import { CallPayload } from '../../utils/types';
import {
    setActiveConversationId,
    setCaller,
    setCallType,
    setIsReceivingCall,
    setReceiver,
} from '../../store/callSlice';

export function useVideoCall() {
    const socket = useContext(SocketContext);
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useContext(AuthContext);
    const { isReceivingCall } = useSelector((state: RootState) => state.calls);

    useEffect(() => {
        socket.on(WebsocketEvents.VIDEO_CALL, (data: CallPayload) => {
            dispatch(setCaller(data.caller))
            dispatch(setIsReceivingCall(true))
            dispatch(setReceiver(user!))
            dispatch(setActiveConversationId(data.conversationId))
            dispatch(setCallType('video'));
        });

        return () => {
            socket.off(WebsocketEvents.VIDEO_CALL);
        };
    }, [isReceivingCall,dispatch,socket]);
}