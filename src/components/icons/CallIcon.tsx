import { FC } from 'react';

const CallIcon: FC<{ className?: string; color?: string }> = ({ className, color }) => {
    return (
        <div className="relative flex justify-center items-center">
            <svg fill={color || 'currentColor'} className={`h-8 w-8 object-contain absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${className || ''}`} role="presentation"
                 viewBox="0 0 36 36"></svg>
            <svg className={`h-8 w-8 object-contain ${className || ''}`} viewBox="0 0 36 36">
                <path d="M25.753 28.2c1.07-.357 1.816-1.275 2.423-2.225a2.05 2.05 0 00.037-2.151 4.998 4.998 0 00-.723-.963 11.594 11.594 0 00-2.888-2.112c-.58-.299-1.272-.212-1.808.159l-2.098 1.452a.472.472 0 01-.437.055 11.557 11.557 0 01-4.045-2.63 11.554 11.554 0 01-2.63-4.044.472.472 0 01.056-.437l1.453-2.098c.37-.536.457-1.228.158-1.807A11.587 11.587 0 0013.14 8.51a4.995 4.995 0 00-.963-.723 2.05 2.05 0 00-2.15.037c-.951.607-1.87 1.353-2.225 2.424-1.174 3.527 1.187 8.461 5.338 12.613 4.152 4.151 9.086 6.512 12.614 5.338z"
                      fill={color || 'currentColor'}
                ></path>
            </svg>
        </div>
    );
};

export default CallIcon;


