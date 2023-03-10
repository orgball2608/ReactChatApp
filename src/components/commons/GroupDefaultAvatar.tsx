import { FC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { defaultGroupAvatar } from '../../utils/constants';
import { Group } from '../../utils/types';
import { Avatar } from './Avatar';

type Props = {
    group: Group;
    groupSize: number;
    itemSize: number;
};

export const GroupDefaultAvatar: FC<Props> = ({ group, groupSize, itemSize }) => {
    if(!group?.users) return (<LazyLoadImage
        src={defaultGroupAvatar}
        alt={'profile'}
        className={`rounded-full object-cover h-${groupSize} w-${groupSize}`}
    />)  
    return (
        <div className={`relative w-${groupSize} h-${groupSize}`}>
            <Avatar user={group.users[0]} size={itemSize} className="absolute top-0 right-0 flex-shrink-0" />
            <Avatar
                user={group.users[1]}
                size={itemSize}
                className="border-dark-light absolute bottom-0 left-0 z-[1] flex-shrink-0  border-[2px] transition duration-300"
            />
        </div>
    );
};
