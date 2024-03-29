import { FC } from 'react';

const ChangeNickNameIcon: FC<{ className?: string; color?: string }> = ({ className, color }) => {
    return (
        <svg className={` h-6 w-6 object-contain ${className || ''}`} viewBox="0 0 36 36">
            <path
                clipRule="evenodd"
                d="M12.243 12.238a.368.368 0 00-.35.255l-2.18 6.675a.25.25 0 00.238.328h4.584a.25.25 0 00.238-.328l-2.18-6.675a.369.369 0 00-.35-.255zm5.802 13.755a1.44 1.44 0 01-1.365-.982l-.928-2.844a.25.25 0 00-.238-.173H8.973a.25.25 0 00-.238.173l-.929 2.844a1.44 1.44 0 11-2.722-.94L9.83 10.7a2.563 2.563 0 014.829 0l4.744 13.37a1.44 1.44 0 01-1.357 1.922zm11.207-5.475a.25.25 0 00-.266-.25l-2.805.176c-1.659.108-2.434.709-2.434 1.779 0 1.105.942 1.766 2.255 1.766 1.79 0 3.25-1.166 3.25-2.692v-.78zm1.409 5.46a1.33 1.33 0 01-1.339-1.336c0-.098-.139-.138-.198-.06-.803 1.058-2.387 1.668-3.925 1.668-2.475 0-4.198-1.56-4.198-3.9 0-2.316 1.7-3.9 4.82-4.088l3.195-.185a.25.25 0 00.236-.25v-.762c0-1.252-1.032-1.829-2.603-1.829-2.066 0-2.316 1.24-3.333 1.24-1.13 0-1.745-1.354-.968-2.172.933-.982 2.349-1.556 4.254-1.556 3.295 0 5.398 1.603 5.398 4.317v7.577a1.33 1.33 0 01-1.34 1.335z"
                fillRule="evenodd"
                fill={color || 'currentColor'}
            ></path>
        </svg>
    );
};

export default ChangeNickNameIcon;
