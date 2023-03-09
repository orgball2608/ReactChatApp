import { FC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getAvatar, getDisplayName } from '../../utils/helpers';
import { User } from '../../utils/types';

type Props = {
    user: User;
    size: number;
    className?: string;
};

export const Avatar: FC<Props> = ({ user, size, className }) => {
    return (
        <LazyLoadImage
            title={getDisplayName(user)}
            src={getAvatar(user)}
            alt={'profile'}
            className={`rounded-full object-cover h-${size} w-${size} ${className}`}
        />
    );
};
