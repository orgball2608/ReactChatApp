import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useContext, useEffect, useRef, useState } from 'react';
import CallIcon from '../icons/CallIcon';
import VideoCallIcon from '../icons/VideoCallIcon';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import MuteIcon from '../icons/MuteIcon';
import { SocketContext } from '../../contex/SocketContext';
import { CallEvents, defaultAvatar } from '../../utils/constants';
import { getDisplayName } from '../../utils/helpers';
import MicIcon from '../icons/MicIcon';
import TurnOffVideoIcon from '../icons/TurnOffVideoIcon';
import { AuthContext } from '../../contex/AuthContext';

export const VideoCallScreen = () => {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const [hiddenLocalStream,setHiddenLocalStream] = useState<boolean>(false)
    const [microphoneEnabled, setMicrophoneEnabled] = useState(true);
    const [videoEnabled, setVideoEnabled] = useState(true);
    const {user} = useContext(AuthContext)
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

    const toggleMicrophone = () =>{
        localStream &&
        setMicrophoneEnabled((prev) => {
            localStream.getTracks()[0].enabled = !prev;
            return !prev;
        });
    }

    const toggleVideo = () => {
        if( localStream ){
            setHiddenLocalStream(videoEnabled);
            localStream &&
            setVideoEnabled((prev) => {
                localStream.getVideoTracks()[0].enabled = !prev;
                return !prev;
            });
        }
    }


    const closeCall = () => {
        socket.emit(CallEvents.VIDEO_CALL_HANG_UP, { caller, receiver });
    };

    return (
        <div className="w-full h-full flex justify-center items-center relative overflow-hidden scroll-x-none">
            {
                localStream ? (
                    <>
                        {
                            call ? <div className="w-full h-full relative">
                                <video ref={remoteVideoRef} playsInline autoPlay className="w-full h-full"/>
                                <div className="absolute top-2 left-2 flex gap-2 items-center">
                                    <img src={receiver?.profile?.avatar|| defaultAvatar} alt="avatar" className="w-10 h-10 rounded-full"/>
                                    <p className="text-base font-medium">
                                        {receiver!.lastName + ', '+ caller!.lastName}
                                    </p>
                                </div>
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
                    <div
                        className={`absolute bottom-4 -right-2 rounded-lg cursor-pointer border-[1px] border-dark-lighten ${hiddenLocalStream ?'transform translate-x-[100%]':'transform translate-x-0'}`}>
                        <video ref={localVideoRef} width={320} height={320} playsInline autoPlay className="rounded-lg"/>
                        {
                            !videoEnabled && <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-50">
                                <img src={user?.profile?.avatar|| defaultAvatar} alt="avatar" className="w-20 h-20 rounded-full"/>
                            </div>
                        }

                        <div
                            onClick={()=>setHiddenLocalStream(true)}
                            className="absolute top-1/2 left-0 transform -translate-y-1/2 flex justify-center items-center cursor-pointer">
                            <BsChevronCompactRight size={28} />
                        </div>

                    </div>
                        {
                            hiddenLocalStream &&  <div
                                onClick={()=>setHiddenLocalStream(false)}
                                className="absolute bottom-4 -right-2 flex justify-center items-center cursor-pointer">
                                <div className="h-56 w-8 bg-dark-lighten flex justify-center cursor-pointer items-center rounded-l-md transition duration-500 ease-in-out transform hover:-translate-x-2">
                                    <BsChevronCompactLeft size={28}/>
                                </div>

                            </div>
                        }

                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-4 cursor-pointer ">
                        {
                            videoEnabled ?  <div
                                onClick={toggleVideo}
                                className="p-[2px] bg-dark-lighten rounded-full flex justify-center items-center">
                                <VideoCallIcon className="w-9 h-9"/>
                            </div> :  <div
                                onClick={toggleVideo}
                                className="p-[2px] bg-white rounded-full flex justify-center items-center">
                                <TurnOffVideoIcon className="w-9 h-9 text-dark-light"/>
                            </div>
                        }

                        {
                            microphoneEnabled ?  <div
                                onClick={toggleMicrophone}
                                className="p-[2px] bg-dark-lighten rounded-full flex justify-center items-center">
                                <MicIcon className="w-9 h-9"/>
                            </div>:  <div
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