import { useContext, useEffect } from 'react';
import { SocketContext } from '../../contex/SocketContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { AuthContext } from '../../contex/AuthContext';
import { WebsocketEvents } from '../../utils/constants';
import { GroupCallPayload } from '../../utils/types';
import {
    setActiveGroupId,
    setGroupCallType,
    setInitiator,
    setIsReceivingGroupCall,
    setParticipants,
} from '../../store/groupCallSlice';

export function useGroupVideoCall() {
    const socket = useContext(SocketContext);
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useContext(AuthContext);
    const { isReceivingGroupCall } = useSelector((state: RootState) => state.groupCalls);

    useEffect(() => {
        socket.on(WebsocketEvents.GROUP_VIDEO_CALL, (data: GroupCallPayload) => {
            const { caller, participants, groupId } = data;
            if (caller.id !== user?.id) {
                console.log('receiving group call', data);
                dispatch(setInitiator(data.caller));
                dispatch(setIsReceivingGroupCall(true));
                dispatch(setParticipants(participants));
                dispatch(setActiveGroupId(groupId));
                dispatch(setGroupCallType('video'));
            } else {
                dispatch(setParticipants(participants));
            }
        });
        return () => {
            socket.off(WebsocketEvents.GROUP_VIDEO_CALL);
        };
    }, [dispatch, socket, isReceivingGroupCall]);
}
