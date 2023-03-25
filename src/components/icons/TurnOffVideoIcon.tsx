import { FC } from 'react';

const TurnOffVideoIcon: FC<{ className?: string; color?: string }> = ({ className, color }) => {
    return (
        <svg className={` h-8 w-8 object-contain ${className || ''}`} viewBox="0 0 36 36">
            <path
                d="M4.366 29.135a1.25 1.25 0 0 1-.043-1.723l19.59-19.589a1.25 1.25 0 0 1 1.722 1.81l-2.196 2.197A1.5 1.5 0 0 0 23 12.89v9.61a4 4 0 0 1-4 4H9.39a1.5 1.5 0 0 0-1.06.44l-2.196 2.195a1.25 1.25 0 0 1-1.768 0zM16.89 9.5a.75.75 0 0 1 .53 1.28L6.28 21.92A.75.75 0 0 1 5 21.39V13.5a4 4 0 0 1 4-4h7.89zM25.829 21.532l3.723 1.861A1 1 0 0 0 31 22.5V13.5a1 1 0 0 0-1.448-.894l-3.723 1.861A1.5 1.5 0 0 0 25 15.81v4.38a1.5 1.5 0 0 0 .829 1.342z"
                fill={color || 'currentColor'}
            ></path>
        </svg>
    );
};

export default TurnOffVideoIcon;

