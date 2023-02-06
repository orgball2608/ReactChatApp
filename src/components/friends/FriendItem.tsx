import Tippy from '@tippyjs/react';
import { FC, useState } from 'react';
import { FriendRequestType, FriendType } from '../../utils/types';
import { FriendMenuContext } from '../menu-context/FriendMenuContext';
import { FriendRequestMenuContext } from '../menu-context/FriendRequestMenuContext';

type Props = {
    friend: FriendType | FriendRequestType;
    type: 'friends' | 'requests';
};

export const FriendItem: FC<Props> = ({ friend, type }) => {
    const [visible, setVisible] = useState(false);
    return (
        <Tippy
            visible={visible}
            onClickOutside={() => setVisible(false)}
            content={
                type !== 'friends' ? (
                    <FriendMenuContext friend={friend} />
                ) : (
                    <FriendRequestMenuContext friend={friend} />
                )
            }
            placement="bottom-end"
            interactive={true}
            animation="fade"
        >
            <div
                onClick={() => setVisible((prevState) => !prevState)}
                className="flex justify-start items-center gap-2"
            >
                <div className="w-10 h-10 rounded-full bg-blue-500 relative">
                    <div className="w-2 h-2 rounded-full absolute bottom-1 right-[2px] bg-green-500"></div>
                </div>
                <span className="text-lg font-medium">{friend.sender.firstName + ' ' + friend.sender.lastName}</span>
            </div>
        </Tippy>
    );
};
