import { FC } from 'react';

const ArchiveIcon: FC<{ className?: string; color?: string }> = ({ className, color }) => {
    return (
        <svg className={`h-6 w-6 object-contain ${className || ''}`} viewBox="0 0 36 36">
            <path d="M8 7.5a1 1 0 00-1 1V10a1 1 0 001 1h20a1 1 0 001-1V8.5a1 1 0 00-1-1H8z" fill={color || 'currentColor'}></path>
            <path clipRule="evenodd"
                  d="M9 13.5a.5.5 0 01.5-.5h17a.5.5 0 01.5.5v12a3 3 0 01-3 3H12a3 3 0 01-3-3v-12zm4.5 3.25c0-.69.56-1.25 1.25-1.25h6.5a1.25 1.25 0 110 2.5h-6.5c-.69 0-1.25-.56-1.25-1.25z"
                  fillRule="evenodd"
                  fill={color || 'currentColor'}
            >
            </path>
        </svg>
    );
};

export default ArchiveIcon;
