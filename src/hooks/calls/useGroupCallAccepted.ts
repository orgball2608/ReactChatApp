import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../contex/AuthContext';
import { SocketContext } from '../../contex/SocketContext';
import { AppDispatch, RootState } from '../../store';
import { AcceptedGroupCallPayload } from '../../utils/types';
import {
    addConnection,
    addGroupCall,
    setActiveGroupId,
    setGroupCallInProgress,
    setIsReceivingGroupCall,
} from '../../store/groupCallSlice';
import { useParams } from 'react-router-dom';
import { WebsocketEvents } from '../../utils/constants';

export function useGroupCallAccepted() {
    const { user } = useContext(AuthContext);
    const socket = useContext(SocketContext);
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<{ id: string }>();
    const { groupPeer, groupLocalStream, participants, initiator } = useSelector(
        (state: RootState) => state.groupCalls,
    );

    useEffect(() => {
        socket.on(WebsocketEvents.GROUP_CALL_ACCEPTED, (data: AcceptedGroupCallPayload) => {
            console.log('onGroupVideoCallAccept');
            const { caller, acceptor } = data;
            dispatch(setGroupCallInProgress(true));
            dispatch(setIsReceivingGroupCall(false));
            dispatch(setActiveGroupId(parseInt(id!)));
            if (!groupPeer) return console.log('group peer is undefined');
            if (caller.id === user!.id) {
                const connection = groupPeer?.connect(acceptor.peer.id);
                dispatch(addConnection(connection));
                if (groupLocalStream) {
                    const newCall = groupPeer?.call(acceptor.peer.id, groupLocalStream);
                    dispatch(addGroupCall(newCall));
                }
            } else {
                participants.forEach(async (participant: any) => {
                    if (participant.id !== user!.id && participant.id !== initiator?.id) {
                        console.log('calling onother account');
                        const connection = groupPeer?.connect(participant.peer.id);
                        dispatch(addConnection(connection));
                        if (!groupLocalStream) return console.log('group local stream is undefined');
                        const newCall = groupPeer?.call(participant.peer.id, groupLocalStream);
                        dispatch(addGroupCall(newCall));
                    }
                });
            }
        });
        return () => {
            socket.off(WebsocketEvents.GROUP_CALL_ACCEPTED);
        };
    }, [dispatch, socket, groupPeer, groupLocalStream, participants]);
}
