import { FC } from 'react';

const FriendIcon: FC<{ className?: string; color?: string }> = ({ className, color }) => {
    return (
        <svg className={`h-6 w-6 object-contain ${className || ''}`} viewBox="0 0 36 36">
            <path
                d="M7.25 12.305C7.25 16.207 9.446 18 12 18s4.75-1.793 4.75-5.695C16.75 9.123 14.75 7 12 7s-4.75 2.123-4.75 5.305zM15.082 21.607c.39-.423.262-1.13-.296-1.269A11.576 11.576 0 0012 20c-4.835 0-9 2.985-9 6.665C3 27.405 3.37 28 4.06 28h7.81c.66 0 1.13-.675 1.13-1.335 0-1.97.83-3.697 2.082-5.058zM19.25 12.305C19.25 16.207 21.446 18 24 18s4.75-1.793 4.75-5.695C28.75 9.123 26.75 7 24 7s-4.75 2.123-4.75 5.305zM33 26.665c0 .74-.37 1.335-1.06 1.335H16.06c-.69 0-1.06-.595-1.06-1.335C15 22.985 19.165 20 24 20s9 2.985 9 6.665z"
                fill={color || 'currentColor'}
            ></path>
        </svg>
    );
};

export default FriendIcon;

