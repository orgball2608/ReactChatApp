import { FC } from 'react';

const CreateConversationIcon: FC<{ className?: string; color?: string }> = ({ className, color }) => {
    return (
        <svg className={` h-6 w-6 object-contain ${className || ''}`} viewBox="0 0 36 36">
            <path d="M17.5 19.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
            <path
                d="M17.305 16.57a1.998 1.998 0 00-.347.467l-1.546 2.87a.5.5 0 00.678.677l2.87-1.545c.171-.093.328-.21.466-.347l8.631-8.631a1.5 1.5 0 10-2.121-2.122l-8.631 8.632z"
                fill={color || 'currentColor'}
                fillRule="evenodd"
            ></path>
            <path
                d="M18 10.5a1 1 0 001-1V9a1 1 0 00-1-1h-6a4 4 0 00-4 4v12a4 4 0 004 4h12a4 4 0 004-4v-6a1 1 0 00-1-1h-.5a1 1 0 00-1 1v6a1.5 1.5 0 01-1.5 1.5H12a1.5 1.5 0 01-1.5-1.5V12a1.5 1.5 0 011.5-1.5h6z"
                fill={color || 'currentColor'}
                fillRule="evenodd"
            ></path>
        </svg>
    );
};

export default CreateConversationIcon;
