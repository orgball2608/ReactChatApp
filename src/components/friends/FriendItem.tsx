import Tippy from '@tippyjs/react';
import { MoreVerticalFill } from 'akar-icons';
import { FC, useState } from 'react';
import { User } from '../../utils/types';
import { FriendMenuContext } from '../menu-context/FriendMenuContext';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import defaultAvatar from '../../__assets__/default_avatar.jpg';
import { LazyLoadImage } from 'react-lazy-load-image-component';

type Props = {
    friend: User;
    isOnline: boolean;
};

export const FriendItem: FC<Props> = ({ friend, isOnline }) => {
    const [visible, setVisible] = useState(false);
    const avatar = friend.profile.avatar ? friend.profile.avatar : defaultAvatar;
    return (
        <div className="flex justify-between items-center w-full group hover:bg-[#b2aeae] cursor-pointer rounded-lg py-1 px-3">
            <div className="flex justify-start items-center gap-2">
                <div className="relative w-10 h-10 rounded-full">
                    <LazyLoadImage src={avatar} effect="opacity" className="w-10 h-10 rounded-full object-cover" />
                    {isOnline && (
                        <div className="w-2 h-2 rounded-full absolute bottom-1 right-[2px] bg-green-500"></div>
                    )}
                </div>

                <span className="text-lg font-medium">{friend.firstName + ' ' + friend.lastName}</span>
            </div>
            <Tippy
                visible={visible}
                onClickOutside={() => setVisible(false)}
                content={<FriendMenuContext friend={friend} setVisible={setVisible} />}
                placement="bottom-end"
                interactive={true}
                animation="fade"
            >
                <div
                    onClick={() => setVisible((prevState) => !prevState)}
                    className="invisible group-hover:visible bg-[#989696] p-2 rounded-full opacity-50"
                >
                    <MoreVerticalFill size={20} />
                </div>
            </Tippy>
        </div>
    );
};
