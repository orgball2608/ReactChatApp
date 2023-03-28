import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useContext, useEffect, useRef, useState } from 'react';
import CallIcon from '../icons/CallIcon';
import MuteIcon from '../icons/MuteIcon';
import { SocketContext } from '../../contex/SocketContext';
import { CallEvents, defaultAvatar } from '../../utils/constants';
import { getDisplayName } from '../../utils/helpers';
import MicIcon from '../icons/MicIcon';

export const VoiceCallScreen = () => {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const [microphoneEnabled, setMicrophoneEnabled] = useState(true);
    const socket = useContext(SocketContext);
    const { localStream, remoteStream,caller,receiver,call} = useSelector(
        (state: RootState) => state.calls
    );

    useEffect(() => {
        console.log('local stream was updated...');
        if (localVideoRef.current && localStream) {
            console.log('updating local video ref');
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);

    useEffect(() => {
        console.log('remote stream was updated...');
        if (remoteVideoRef.current && remoteStream) {
            console.log('updating remote video ref');
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    const toggleMicrophone = () =>
        localStream &&
        setMicrophoneEnabled((prev) => {
            localStream.getTracks()[0].enabled = !prev;
            return !prev;
        });

    const closeCall = () => {
        socket.emit(CallEvents.VOICE_CALL_HANG_UP, { caller, receiver });
    };

    return (
        <div className="w-full h-full flex justify-center items-center relative overflow-hidden scroll-x-none">
            {
                localStream ? (
                    <>
                        {
                            call ? <div className="w-full h-full relative flex justify-center items-center">
                                    <audio ref={remoteVideoRef} playsInline autoPlay className="w-full h-full hidden" />
                                    <div className="absolute top-2 left-2 flex gap-2 items-center">
                                        <img src={receiver?.profile?.avatar|| defaultAvatar} alt="avatar" className="w-10 h-10 rounded-full"/>
                                        <p className="text-base font-medium">
                                            {receiver!.lastName + ', '+ caller!.lastName}
                                        </p>
                                    </div>
                                    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-2">
                                        <img src={receiver?.profile?.avatar|| defaultAvatar} alt="avatar" className="w-32 h-32 rounded-full"/>
                                        <p className="text-xl font-medium">
                                            {getDisplayName(receiver!)}
                                        </p>
                                    </div>
                                </div> :
                                <div className="flex flex-col justify-center items-center gap-1">
                                    <img src={receiver?.profile?.avatar|| defaultAvatar} alt="avatar" className="w-32 h-32 rounded-full"/>
                                    <p className="text-2xl font-semibold">
                                        {getDisplayName(receiver!)}
                                    </p>
                                    <p className="text-xl text-gray-400 font-medium">
                                        is calling...
                                    </p>
                                </div>
                        }
                        <div className={`absolute bottom-4 right-2 rounded-lg w-56 h-42`}>
                            <audio ref={localVideoRef} playsInline autoPlay className="rounded-lg"/>
                        </div>

                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-4 cursor-pointer ">
                            {
                                microphoneEnabled ?  <div
                                    onClick={toggleMicrophone}
                                    className="p-[2px] bg-dark-lighten rounded-full flex justify-center items-center">
                                    <MicIcon className="w-9 h-9"/>
                                </div>: <div
                                    onClick={toggleMicrophone}
                                    className="p-[2px] bg-white rounded-full flex justify-center items-center">
                                    <MuteIcon className="w-9 h-9 text-dark-light"/>
                                </div>
                            }
                            <div
                                onClick={closeCall}
                                className="p-[2px] bg-red-600 rounded-full flex justify-center items-center">
                                <CallIcon className="w-9 h-9"/>
                            </div>
                        </div>

                    </>): <div className="text-xl font-medium">
                    Call just end
                </div>
            }
        </div>
    );
};