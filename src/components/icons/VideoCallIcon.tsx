import { FC } from 'react';

const VideoCallIcon: FC<{ className?: string; color?: string }> = ({ className, color }) => {
    return (
        <div className="relative flex justify-center items-center">
            <svg fill={color || 'currentColor'} className={`h-8 w-8 object-contain absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${className || ''}`} role="presentation"
                 viewBox="0 0 36 36"></svg>
            <svg className={`h-8 w-8 object-contain ${className || ''}`} viewBox="0 0 36 36">
                <path d="M9 9.5a4 4 0 00-4 4v9a4 4 0 004 4h10a4 4 0 004-4v-9a4 4 0 00-4-4H9zm16.829 12.032l3.723 1.861A1 1 0 0031 22.5v-9a1 1 0 00-1.448-.894l-3.723 1.861A1.5 1.5 0 0025 15.81v4.38a1.5 1.5 0 00.829 1.342z"
                      fill={color || 'currentColor'}
                ></path>
            </svg>
        </div>
    );
};

export default VideoCallIcon;

