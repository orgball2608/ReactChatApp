import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SocketContext } from '../../contex/SocketContext';
import { AppDispatch } from '../../store';
import { WebsocketEvents } from '../../utils/constants';
import { AuthContext } from '../../contex/AuthContext';
import { endGroupCall } from '../../store/groupCallSlice';
import { GroupCallRejectEventPayload } from '../../utils/types';

export function useGroupCallRejected() {
    const socket = useContext(SocketContext);
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useContext(AuthContext);
    useEffect(() => {
        socket.on(WebsocketEvents.GROUP_CALL_REJECTED, (data: GroupCallRejectEventPayload) => {
            const { receiver, isEndCall } = data;
            if (isEndCall) {
                dispatch(endGroupCall());
            } else {
                if (receiver.id === user?.id) {
                    dispatch(endGroupCall());
                }
            }
        });
        return () => {
            socket.off(WebsocketEvents.GROUP_CALL_REJECTED);
        };
    }, [dispatch, socket]);
}
