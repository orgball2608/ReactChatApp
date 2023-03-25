import { FC } from 'react';

const ChevronIcon: FC<{ className?: string; color?: string }> = ({ className, color }) => {
    return (
        <svg className={` h-6 w-6 object-contain ${className || ''}`} viewBox="0 0 8 28">
            <path d="M2 2l4 12-4 12" fill={color || 'currentColor'}></path>
        </svg>
    );
};

export default ChevronIcon;

