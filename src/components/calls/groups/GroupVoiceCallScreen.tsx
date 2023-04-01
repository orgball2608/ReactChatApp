import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useContext, useEffect, useRef, useState } from 'react';
import CallIcon from '../../icons/CallIcon';
import MuteIcon from '../../icons/MuteIcon';
import { CallEvents, defaultAvatar } from '../../../utils/constants';
import MicIcon from '../../icons/MicIcon';
import VoiceRemoteStreams from './VoiceRemoteStreams';
import { SocketContext } from '../../../contex/SocketContext';
import { Group, User } from '../../../utils/types';
import { AuthContext } from '../../../contex/AuthContext';

export const GroupVoiceCallScreen = () => {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const [microphoneEnabled, setMicrophoneEnabled] = useState(true);
    const socket = useContext(SocketContext);
    const { user } = useContext(AuthContext);
    const { groupLocalStream, groupRemoteStreams, groupCalls, participants } = useSelector(
        (state: RootState) => state.groupCalls,
    );
    const group = useSelector((state: RootState) =>
        state.group.groups.find((group: Group) => group.id === state.groupCalls.activeGroupId),
    );
    useEffect(() => {
        if (localVideoRef.current && groupLocalStream) {
            localVideoRef.current.srcObject = groupLocalStream;
        }
    }, [groupLocalStream]);

    const toggleMicrophone = () =>
        groupLocalStream &&
        setMicrophoneEnabled((prev) => {
            groupLocalStream.getTracks()[0].enabled = !prev;
            return !prev;
        });

    const closeCall = () => {
        const peers = groupCalls?.map((call) => call.peer);
        const members = [] as User[];
        participants.forEach((participant) => {
            if (peers?.includes(participant.peer.id)) {
                members.push(participant);
            }
        });
        socket.emit(CallEvents.GROUP_CALL_HANG_UP, { participants: members, streamId: groupLocalStream?.id });
    };

    return (
        <div className="w-full h-full flex justify-center items-center relative overflow-hidden scroll-x-none">
            {groupLocalStream ? (
                <>
                    {groupCalls && groupCalls?.length > 0 ? (
                        <div className="w-full h-full rounded-lg relative">
                            <audio
                                ref={localVideoRef}
                                playsInline
                                autoPlay
                                className="object-cover w-full h-full hidden"
                            />
                            <div className="absolute bg-dark-light h-full w-full top-0 left-0 transform z-30">
                                <div className="flex w-full h-full justify-center items-center">
                                    <img
                                        src={user?.profile?.avatar || defaultAvatar}
                                        alt="avatar"
                                        className="w-36 h-36 rounded-full border-[1px] border-dark-gray"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center gap-1">
                            <img src={group?.avatar || defaultAvatar} alt="avatar" className="w-32 h-32 rounded-full" />
                            <p className="text-2xl font-semibold">{group?.title}</p>
                            <p className="text-xl text-gray-400 font-medium">is calling...</p>
                        </div>
                    )}
                    {groupRemoteStreams.length > 0 && <VoiceRemoteStreams remoteStreams={groupRemoteStreams} />}

                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-4 cursor-pointer z-50">
                        {microphoneEnabled ? (
                            <div
                                onClick={toggleMicrophone}
                                className="p-[2px] bg-dark-lighten rounded-full flex justify-center items-center"
                            >
                                <MicIcon className="w-9 h-9" />
                            </div>
                        ) : (
                            <div
                                onClick={toggleMicrophone}
                                className="p-[2px] bg-white rounded-full flex justify-center items-center"
                            >
                                <MuteIcon className="w-9 h-9 text-dark-light" />
                            </div>
                        )}
                        <div
                            onClick={closeCall}
                            className="p-[2px] bg-red-600 rounded-full flex justify-center items-center"
                        >
                            <CallIcon className="w-9 h-9" />
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-xl font-medium">Call just end</div>
            )}
        </div>
    );
};
