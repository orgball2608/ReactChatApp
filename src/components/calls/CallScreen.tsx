import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useContext, useEffect, useRef, useState } from 'react';
import CallIcon from '../icons/CallIcon';
import VideoCallIcon from '../icons/VideoCallIcon';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import MuteIcon from '../icons/MuteIcon';
import { SocketContext } from '../../contex/SocketContext';
import { defaultAvatar } from '../../utils/constants';
import { getDisplayName } from '../../utils/helpers';
import MicIcon from '../icons/MicIcon';
import TurnOffVideoIcon from '../icons/TurnOffVideoIcon';

export const CallScreen = () => {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const [hiddenLocalStream,setHiddenLocalStream] = useState<boolean>(false)
    const [microphoneEnabled, setMicrophoneEnabled] = useState(true);
    const [videoEnabled, setVideoEnabled] = useState(true);
    const socket = useContext(SocketContext);
    const { localStream, remoteStream,caller,receiver,call} = useSelector(
        (state: RootState) => state.calls
    );

    useEffect(() => {
        console.log('local stream was updated...');
        if (localVideoRef.current && localStream) {
            console.log('updating local video ref');
            localVideoRef.current.srcObject = localStream;
            localVideoRef.current.muted = true;
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

    const toggleVideo = () => {
        setHiddenLocalStream(videoEnabled);
        localStream &&
        setVideoEnabled((prev) => {
            localStream.getVideoTracks()[0].enabled = !prev;
            return !prev;
        });
    }


    const closeCall = () => {
        socket.emit('videoCallHangUp', { caller, receiver });
    };

    return (
        <div className="w-full h-full flex justify-center items-center relative overflow-hidden scroll-x-none">
            {

                localStream ? (
                    <>
                        {
                            call ? <div className="w-full h-full">
                                <video ref={remoteVideoRef} playsInline autoPlay className="w-full h-full" />
                            </div> :
                                <div className="flex flex-col justify-center items-center gap-2">
                                    <img src={receiver?.profile?.avatar|| defaultAvatar} alt="avatar" className="w-32 h-32 rounded-full"/>
                                    <p className="text-xl font-medium">
                                        {getDisplayName(receiver!)}
                                    </p>
                                    <p className="text-xl font-medium">
                                        is calling...
                                    </p>
                                </div>
                        }
                    <div className={`absolute bottom-0 right-0 rounded-lg ${hiddenLocalStream ?'transform translate-x-[100%]':'transform translate-x-0'}`}>
                        <video ref={localVideoRef} width={250} height={200} playsInline autoPlay className="rounded-lg"/>
                        <div
                            onClick={()=>setHiddenLocalStream(true)}
                            className="absolute top-1/2 left-0 transform -translate-y-1/2 flex justify-center items-center cursor-pointer">
                            <BsChevronCompactRight size={28} />
                        </div>
                    </div>
                        {
                            hiddenLocalStream &&  <div
                                onClick={()=>setHiddenLocalStream(false)}
                                className="absolute bottom-10 right-4 transform -translate-y-1/2 flex justify-center items-center cursor-pointer">
                                <BsChevronCompactLeft size={28} />
                            </div>
                        }

                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-4 cursor-pointer ">
                        {
                            videoEnabled ?  <div
                                onClick={toggleVideo}
                                className="p-[2px] bg-dark-lighten rounded-full flex justify-center items-center">
                                <VideoCallIcon className="w-9 h-9"/>
                            </div> :  <div
                                onClick={toggleVideo}
                                className="p-[2px] bg-dark-lighten rounded-full flex justify-center items-center">
                                <TurnOffVideoIcon className="w-9 h-9"/>
                            </div>
                        }

                        {
                            microphoneEnabled ?  <div
                                onClick={toggleMicrophone}
                                className="p-[2px] bg-dark-lighten rounded-full flex justify-center items-center">
                                <MicIcon className="w-9 h-9"/>
                            </div>:  <div
                                onClick={toggleMicrophone}
                                className="p-[2px] bg-dark-lighten rounded-full flex justify-center items-center">
                                <MuteIcon className="w-9 h-9"/>
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