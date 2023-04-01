import React, { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { User } from '../../../utils/types';
import { defaultAvatar } from '../../../utils/constants';

interface RemoteStreamsProps {
    remoteStreams: MediaStream[];
}

const VoiceRemoteStreams: FC<RemoteStreamsProps> = ({ remoteStreams }) => {
    const videoRefs = useRef<(HTMLAudioElement | null)[]>([]);
    const { groupCalls, participants } = useSelector((state: RootState) => state.groupCalls);

    // create an array of refs to store references to the video elements
    const createVideoRefs = (length: number) => {
        videoRefs.current = new Array(length)
            .fill(null)
            .map((_, index) => videoRefs.current[index] ?? React.createRef<HTMLAudioElement>().current);
    };

    // update the srcObject property of each video element with the corresponding media stream
    const updateVideoStreams = () => {
        remoteStreams.forEach((stream, index) => {
            const videoRef = videoRefs.current[index];
            if (videoRef) {
                videoRef.srcObject = stream;
            }
        });
    };

    // create the video elements and store their references in videoRefs
    createVideoRefs(remoteStreams.length);

    // update the srcObject property of each video element when the remoteStreams prop changes
    useEffect(() => {
        updateVideoStreams();
    }, [remoteStreams]);

    const getUser = (index: number): User | null => {
        if (!groupCalls) return null;
        const peers = groupCalls[index]?.peer;
        for (const participant of participants) {
            if (peers?.includes(participant.peer?.id)) {
                return participant as User;
            }
        }
        return null;
    };

    return (
        <div className="w-80 h-full bg-dark-lighten absolute right-0 top-0 flex flex-col flex-wrap overflow-y-auto overflow-x-hidden gap-1 z-50 border-[1px] border-border-conversations">
            {remoteStreams.map((_, index) => (
                <div key={index} className="w-80 h-48 bg-dark-gray border-[1px] border-border-conversations rounded-lg">
                    <audio
                        ref={(el) => (videoRefs.current[index] = el)}
                        playsInline
                        autoPlay
                        className="w-80 h-fit rounded-md hidden"
                    />
                    <div className="absolute top-0 left-0 w-80 h-48 flex justify-center items-center">
                        <img
                            src={getUser(index)?.profile?.avatar || defaultAvatar}
                            alt="avatar"
                            className="w-20 h-20 rounded-full border-[1px] border-dark-gray"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VoiceRemoteStreams;
