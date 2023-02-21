import { FC } from 'react';

const FileMediaIcon: FC<{ className?: string }> = ({ className }) => {
    return (
        <svg className={` h-[22px] w-6 object-contain ${className || ''}`} viewBox="0 0 36 36" fill="currentColor">
            <path d="M17.5 19.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
            <path
                d="M24 12.75c0 .138.112.25.25.25H27a3 3 0 013 3v10a3 3 0 01-3 3H15a3 3 0 01-3-3v-2.75a.25.25 0 00-.25-.25H9a3 3 0 01-3-3V10a3 3 0 013-3h12a3 3 0 013 3v2.75zM21 9.5H9a.5.5 0 00-.5.5v10a.5.5 0 00.5.5h2.75a.25.25 0 00.25-.25V16a3 3 0 013-3h6.25a.25.25 0 00.25-.25V10a.5.5 0 00-.5-.5zM14.5 16a.5.5 0 01.5-.5h12a.5.5 0 01.5.5v7.577a.25.25 0 01-.375.217l-3.725-2.15a4.8 4.8 0 00-4.8 0l-3.725 2.15a.25.25 0 01-.375-.217V16z"
                fill-rule="evenodd"
            ></path>
        </svg>
    );
};

export default FileMediaIcon;
