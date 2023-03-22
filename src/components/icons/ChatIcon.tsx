import { FC } from 'react';

const ChatIcon: FC<{ className?: string; color?: string }> = ({ className, color }) => {
    return (
        <svg className={`h-6 w-6 object-contain ${className || ''}`} viewBox="0 0 36 36">
            <path
                clipRule="evenodd"
                d="M29 17.504c0 6.103-4.606 10.57-11 10.57-1.065 0-2.08-.095-3.032-.327a4.26 4.26 0 00-2.39.09L8.91 28.962c-.59.202-1.164-.372-.964-.985l.729-2.411a3.007 3.007 0 00-.291-2.5C7.414 21.484 7 19.596 7 17.504v-.002c0-6.103 4.607-10.498 11-10.498s11 4.395 11 10.498v.002z"
                fillRule="evenodd"
                fill={color || 'currentColor'}
            ></path>
        </svg>
    );
};

export default ChatIcon;
