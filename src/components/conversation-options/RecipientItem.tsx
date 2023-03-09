import { FC, useContext, useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { User } from '../../utils/types';
import Tippy from '@tippyjs/react';
import { RecipientOptionMenuContext } from '../menu-context/RecipientOptionMenuContex';
import { AuthContext } from '../../contex/AuthContext';
import { defaultAvatar } from '../../utils/constants';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type Props = {
    user: User;
    isOnline: boolean;
};

export const RecipientItem: FC<Props> = ({ user, isOnline }) => {
    const [visible, setVisible] = useState(false);
    const { user: own } = useContext(AuthContext);
    const { id } = useParams();
    const groups = useSelector((state: RootState) => state.group.groups);
    const selectedGroup = groups.find((group) => group.id === parseInt(id!));

    const getFullName = (user: User) => user.lastName + ' ' + user.firstName;
    const getGroupAvatar = () => {
        if (user.profile) {
            if (user.profile.avatar) {
                return user.profile.avatar;
            }
            return defaultAvatar;
        }
        return defaultAvatar;
    };

    const getDisplayRole = () => {
        if (selectedGroup?.owner?.id === user.id && selectedGroup?.creator?.id === user.id) return 'Creator & Admin';
        if (selectedGroup?.owner?.id === user.id) {
            return 'Admin';
        } else if (selectedGroup?.creator?.id === user.id) {
            return 'Creator';
        }
        return 'Member';
    };

    return (
        <div key={user.id} className="flex justify-between items-center">
            <div className="flex justify-start items-center text-base gap-4 my-1 font-medium">
                <div className="w-8 h-8 rounded-full relative">
                    <LazyLoadImage
                        src={getGroupAvatar()}
                        alt="avatar"
                        effect="blur"
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    {isOnline && <div className="w-2 h-2 rounded-full absolute bottom-0 right-0 bg-green-500"></div>}
                </div>
                <div className="flex flex-col justify-center">
                    <span>{getFullName(user)}</span>
                    <span className="text-xs text-gray-400">{getDisplayRole()}</span>
                </div>
            </div>
            {own?.id !== user.id && (
                <Tippy
                    visible={visible}
                    onClickOutside={() => setVisible(false)}
                    content={<RecipientOptionMenuContext recipient={user} setVisible={setVisible} />}
                    placement="bottom-start"
                    interactive={true}
                    animation="fade"
                    theme="group_member"
                >
                    <div
                        onClick={() => setVisible((prevState) => !prevState)}
                        className="p-2 relative hover:bg-[#686868] rounded-full cursor-pointer"
                    >
                        <FiMoreHorizontal size={16} className="text-white" />
                    </div>
                </Tippy>
            )}
        </div>
    );
};
