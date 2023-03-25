import { FC } from 'react';

const MicIcon: FC<{ className?: string; color?: string }> = ({ className, color }) => {
    return (
        <svg className={`h-8 w-8 object-contain ${className || ''}`} viewBox="6 6 36 36">
            <path
                  d="M20 34h8a1 1 0 0 1 0 2h-8a1 1 0 0 1 0-2m4-5.5a5 5 0 0 1-5-5V17a5 5 0 0 1 10 0v6.5a5 5 0 0 1-5 5m0 4a9 9 0 0 1-9-9 1 1 0 0 1 2 0 7 7 0 1 0 14 0 1 1 0 0 1 2 0 9 9 0 0 1-9 9"
                  fill={color || 'currentColor'}
            ></path>
        </svg>
    );
};

export default MicIcon;



