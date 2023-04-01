import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SocketContext } from '../../contex/SocketContext';
import { AppDispatch } from '../../store';
import { removeGroupCall, removeGroupRemoteStream, removeParticipants } from '../../store/groupCallSlice';
import { WebsocketEvents } from '../../utils/constants';

export function useGroupCallMemberLeft() {
    const socket = useContext(SocketContext);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        socket.on(WebsocketEvents.GROUP_CALL_MEMBER_LEFT, ({ finisher, streamId }) => {
            if (!finisher) return;
            dispatch(removeGroupRemoteStream(streamId));
            dispatch(removeGroupCall(finisher.peer.id));
            dispatch(removeParticipants(finisher.id));
        });
        return () => {
            socket.off(WebsocketEvents.GROUP_CALL_MEMBER_LEFT);
        };
    }, [dispatch, socket]);
}
