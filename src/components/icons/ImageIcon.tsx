import { FC } from 'react';

const ImageIcon: FC<{ className?: string }> = ({ className }) => {
    return (
        <svg className={` h-6 w-6 object-contain ${className || ''}`} viewBox="0 0 36 36" fill="currentColor">
            <path
                d="M26 29H10a4 4 0 01-4-4V11a4 4 0 014-4h16a4 4 0 014 4v14a4 4 0 01-4 4zm0-19H10a1 1 0 00-1 1v11.648l5.763-2.881a7.24 7.24 0 016.474 0L27 22.648V11a1 1 0 00-1-1zm-12.5 7a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
                fill-rule="evenodd"
            ></path>
        </svg>
    );
};

export default ImageIcon;
