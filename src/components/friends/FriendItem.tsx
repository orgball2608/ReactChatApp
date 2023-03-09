import Tippy from '@tippyjs/react';
import { MoreVerticalFill } from 'akar-icons';
import { FC, useState } from 'react';
import { User } from '../../utils/types';
import { FriendMenuContext } from '../menu-context/FriendMenuContext';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate, useParams } from 'react-router-dom';
import { getAvatar } from '../../utils/helpers';

type Props = {
    friend: User;
    isOnline: boolean;
};

export const FriendItem: FC<Props> = ({ friend, isOnline }) => {
    const [visible, setVisible] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const onProfileClick = () => {
        if (parseInt(id!) === friend.id) setVisible(false);
        else {
            navigate(`/friend/profile/${friend.id}`);
            setVisible(false);
        }
    };
    return (
        <div className="flex justify-between items-center w-full cursor-pointer py-1 px-2 relative">
            <div
                onClick={onProfileClick}
                className="flex justify-start items-center gap-2 hover:bg-[#2c2a2a] w-full rounded-lg px-1 py-1"
            >
                <div className="relative w-10 h-10 rounded-full">
                    <LazyLoadImage
                        src={getAvatar(friend)}
                        effect="opacity"
                        className="w-10 h-10 rounded-full object-cover"
                    />
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
                theme="friend_option"
            >
                <div
                    onClick={() => setVisible((prevState) => !prevState)}
                    className=" bg-[#989696] p-1 rounded-full opacity-50 absolute right-4 z-50 top-auto bottom-auto hover:opacity-70"
                >
                    <MoreVerticalFill size={20} />
                </div>
            </Tippy>
        </div>
    );
};
