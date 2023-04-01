import React, { useRef } from 'react';

interface RemoteStreamsProps {
    remoteStreams: MediaStream[];
}

const VoiceRemoteStreams: React.FC<RemoteStreamsProps> = ({ remoteStreams }) => {
    const videoRefs = useRef<(HTMLAudioElement | null)[]>([]);

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
    React.useEffect(() => {
        updateVideoStreams();
    }, [remoteStreams]);

    return (
        <>
            {remoteStreams.map((_, index) => (
                <audio
                    key={index}
                    ref={(el) => (videoRefs.current[index] = el)}
                    playsInline
                    autoPlay
                    className="w-1/2 h-1/2"
                />
            ))}
        </>
    );
};

export default VoiceRemoteStreams;
