import Tippy from '@tippyjs/react';
import { FC, useContext, useState } from 'react';
import { FriendRequestType, FriendType } from '../../utils/types';
import { FriendRequestMenuContext } from '../menu-context/FriendRequestMenuContext';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { defaultAvatar } from '../../utils/constants';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AuthContext } from '../../contex/AuthContext';
import { getDisplayName } from '../../utils/helpers';

type Props = {
    friend: FriendType | FriendRequestType;
};

export const FriendRequestItem: FC<Props> = ({ friend }) => {
    const [visible, setVisible] = useState(false);
    const { user } = useContext(AuthContext);
    const recipient = friend.sender.id === user?.id ? friend.receiver : friend.sender;
    const getAvatar = () => {
        if (recipient.profile === null) return defaultAvatar;
        return recipient.profile.avatar ? recipient.profile.avatar : defaultAvatar;
    };
    return (
        <Tippy
            visible={visible}
            onClickOutside={() => setVisible(false)}
            content={<FriendRequestMenuContext friend={friend} setVisible={setVisible} />}
            placement="bottom-end"
            interactive={true}
            animation="fade"
            theme="request_option"
        >
            <div
                onClick={() => setVisible((prevState) => !prevState)}
                className="flex justify-start items-center gap-2"
            >
                <LazyLoadImage
                    src={getAvatar()}
                    alt="avatar"
                    effect="blur"
                    className="w-10 h-10 rounded-full relative"
                />
                <span className="text-base">{getDisplayName(recipient)}</span>
            </div>
        </Tippy>
    );
};
