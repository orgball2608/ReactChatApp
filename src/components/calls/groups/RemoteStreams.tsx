import React, { useRef } from 'react';

interface RemoteStreamsProps {
    remoteStreams: MediaStream[];
}

const RemoteStreams: React.FC<RemoteStreamsProps> = ({ remoteStreams }) => {
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    // create an array of refs to store references to the video elements
    const createVideoRefs = (length: number) => {
        videoRefs.current = new Array(length)
            .fill(null)
            .map((_, index) => videoRefs.current[index] ?? React.createRef<HTMLVideoElement>().current);
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
        <div className="w-80 h-full bg-dark-lighten absolute right-0 top-0 flex flex-col flex-wrap overflow-y-auto overscroll-x-none gap-1 z-50 border-[1px] border-border-conversations">
            {remoteStreams.map((_, index) => (
                <video
                    key={index}
                    ref={(el) => (videoRefs.current[index] = el)}
                    autoPlay
                    className="w-80 h-fit rounded-md"
                />
            ))}
        </div>
    );
};

export default RemoteStreams;
