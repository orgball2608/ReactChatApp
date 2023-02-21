import { FC } from 'react';

const PencilIcon: FC<{ className?: string }> = ({ className }) => {
    return (
        <svg className={` h-6 w-6 object-contain ${className || ''}`} viewBox="0 0 36 36" fill="currentColor">
            <path d="M20.953 12.569a.75.75 0 00-1.06 0l-8.938 8.937a4.004 4.004 0 00-.715.973l-2.121 4.05c-.455.867.481 1.804 1.35 1.349l4.049-2.121c.358-.188.686-.429.972-.715l8.938-8.937a.75.75 0 000-1.061l-2.475-2.475zm3.889 1.061a.75.75 0 001.06 0l1.363-1.362a2.5 2.5 0 00-3.536-3.536l-1.362 1.362a.75.75 0 000 1.06l2.475 2.476z"></path>
        </svg>
    );
};

export default PencilIcon;
