import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../../contex/SocketContext';
import { AppDispatch, RootState } from '../../store';
import { WebsocketEvents } from '../../utils/constants';
import { resetState } from '../../store/callSlice';


export function useVoiceCallHangUp() {
    const socket = useContext(SocketContext);
    const dispatch = useDispatch<AppDispatch>();
    const { call, connection, localStream, remoteStream } = useSelector(
        (state: RootState) => state.calls
    );
    useEffect(() => {
        socket.on(WebsocketEvents.VOICE_CALL_HANG_UP, () => {
            localStream &&
            localStream.getTracks().forEach((track) => {
                track.stop();
            });
            remoteStream &&
            remoteStream.getTracks().forEach((track) => {
                track.stop();
            });
            call && call.close();
            connection && connection.close();
            dispatch(resetState());
        });

        return () => {
            socket.off(WebsocketEvents.VOICE_CALL_HANG_UP);
        };
    }, [call, remoteStream, localStream,dispatch,socket]);
}