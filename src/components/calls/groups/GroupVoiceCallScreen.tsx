import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useEffect, useRef, useState } from 'react';
import CallIcon from '../../icons/CallIcon';
import MuteIcon from '../../icons/MuteIcon';
import {defaultAvatar } from '../../../utils/constants';
import MicIcon from '../../icons/MicIcon';
import VoiceRemoteStreams from './VoiceRemoteStreams';

export const VoiceCallScreen = () => {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const [microphoneEnabled, setMicrophoneEnabled] = useState(true);
    const { groupLocalStream, groupRemoteStreams ,groupCalls, activeGroupId} = useSelector(
        (state: RootState) => state.groupCalls
    );
    const group = useSelector((state: RootState) => state.group.groups.find((group) => group.id === state.groupCalls.activeGroupId));
    useEffect(() => {
        console.log('local stream was updated...');
        if (localVideoRef.current && groupLocalStream) {
            console.log('updating local video ref');
            localVideoRef.current.srcObject = groupLocalStream;
        }
    }, [groupLocalStream]);

    const toggleMicrophone = () =>
        groupLocalStream &&
            setMicrophoneEnabled((prev) => {
                groupLocalStream.getTracks()[0].enabled = !prev;
                return !prev;
            });

    return (
        <div className="w-full h-full flex justify-center items-center relative overflow-hidden scroll-x-none">
            {
                groupLocalStream ? (
                    <>
                        {
                           groupCalls && groupCalls?.length > 0 ? <div className="w-full h-full relative flex justify-center items-center">
                                    <VoiceRemoteStreams remoteStreams={groupRemoteStreams}/>
                                </div> :
                                <div className="flex flex-col justify-center items-center gap-1">
                                    <img  src={group?.avatar|| defaultAvatar} alt="avatar" className="w-32 h-32 rounded-full"/>
                                    <p className="text-2xl font-semibold">
                                        {group?.title}
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