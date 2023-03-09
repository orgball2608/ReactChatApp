import { FC } from 'react';

const ArrowDownIcon: FC<{ className?: string; color?: string }> = ({ className, color }) => {
    return (
        <svg className={` h-6 w-6 object-contain ${className || ''}`} viewBox="0 0 36 36">
            <path
                d="M24.616 18.366a1.25 1.25 0 011.768 1.768l-7.5 7.5a1.25 1.25 0 01-1.768 0l-7.5-7.5a1.25 1.25 0 011.768-1.768l4.94 4.94a.25.25 0 00.426-.177V9.25a1.25 1.25 0 112.5 0v13.879c0 .222.27.334.427.176l4.94-4.939z"
                fill={color || '#fff'}
            ></path>
        </svg>
    );
};

export default ArrowDownIcon;
