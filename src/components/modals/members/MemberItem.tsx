import Tippy from '@tippyjs/react';
import { FC, useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { defaultAvatar } from '../../../utils/constants';
import { getDisplayName } from '../../../utils/helpers';
import { Group, User } from '../../../utils/types';
import { RecipientOptionMenuContext } from '../../menu-context/RecipientOptionMenuContex';

type MemberItemProps = {
    user: User | undefined;
    group: Group | undefined;
};

export const MemberItem: FC<MemberItemProps> = ({ user, group }) => {
    const [visible, setVisible] = useState(false);
    const getMemberRole = (user: User) => {
        if (user.id === group?.owner.id && user.id === group?.owner.id) return 'Admin & Creator';
        if (user.id === group?.owner.id) return 'Admin';
        else if (user.id === group?.creator.id) return 'Creator';
        else return 'Member';
    };
    return (
        <div
            key={user?.id}
            className="flex justify-between items-center 
        hover:bg-[#1a1a1c] rounded-md px-2 py-2"
        >
            <div className="flex justify-start items-center gap-3  rounded-md">
                <img src={user?.profile.avatar || defaultAvatar} className="w-10 h-10 rounded-full" />
                <div className="flex flex-col justify-between cursor-pointer">
                    <span className="text-base">{user && getDisplayName(user)}</span>

                    <span className="text-xs text-[#868a91]">{getMemberRole(user!)}</span>
                </div>
            </div>
            <Tippy
                visible={visible}
                onClickOutside={() => setVisible(false)}
                content={<RecipientOptionMenuContext recipient={user!} setVisible={setVisible} />}
                placement="bottom-start"
                interactive={true}
                animation="fade"
            >
                <div
                    onClick={() => setVisible((prevState) => !prevState)}
                    className="p-2 relative hover:bg-[#434242] rounded-full cursor-pointer"
                >
                    <FiMoreHorizontal size={16} className="text-white" />
                </div>
            </Tippy>
        </div>
    );
};
