import { FC } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { User } from '../../utils/types';
import Tippy from '@tippyjs/react';
import { RecipientOptionMenuContext } from '../menu-context/RecipientOptionMenuContex';

type Props = {
    user: User;
};

export const RecipientItem: FC<Props> = ({ user }) => {
    const getFullName = (user: User) => user.lastName + ' ' + user.firstName;
    return (
        <div key={user.id} className="flex justify-between items-center">
            <div className="flex justify-start items-center text-base gap-4 my-1 font-medium">
                <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                <span>{getFullName(user)}</span>
            </div>
            <Tippy content={<RecipientOptionMenuContext />} placement="bottom-start" trigger="click" animation="fade">
                <div className="p-2 relative hover:bg-[#686868] rounded-full">
                    <FiMoreHorizontal size={16} className="text-white" />
                </div>
            </Tippy>
        </div>
    );
};
