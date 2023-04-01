import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../../contex/SocketContext';
import { AppDispatch, RootState } from '../../store';
import { WebsocketEvents } from '../../utils/constants';
import { endGroupCall } from '../../store/groupCallSlice';

export function useGroupCallHangUp() {
    const socket = useContext(SocketContext);
    const dispatch = useDispatch<AppDispatch>();
    const { groupLocalStream } = useSelector((state: RootState) => state.groupCalls);
    useEffect(() => {
        socket.on(WebsocketEvents.GROUP_CALL_HANG_UP, () => {
            console.log('hang up');
            groupLocalStream &&
                groupLocalStream.getTracks().forEach((track) => {
                    track.stop();
                });
            const localTrack = groupLocalStream?.getVideoTracks()[0];
            localTrack?.stop();
            dispatch(endGroupCall());
        });
        return () => {
            socket.off(WebsocketEvents.GROUP_CALL_HANG_UP);
        };
    }, [dispatch, socket]);
}
