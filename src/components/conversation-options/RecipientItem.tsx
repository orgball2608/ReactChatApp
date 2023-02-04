import { FC, useContext, useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { User } from '../../utils/types';
import Tippy from '@tippyjs/react';
import { RecipientOptionMenuContext } from '../menu-context/RecipientOptionMenuContex';
import { AuthContext } from '../../contex/AuthContext';

type Props = {
    user: User;
};

export const RecipientItem: FC<Props> = ({ user }) => {
    const [visible, setVisible] = useState(false);
    const { user: own } = useContext(AuthContext);

    const getFullName = (user: User) => user.lastName + ' ' + user.firstName;
    return (
        <div key={user.id} className="flex justify-between items-center">
            <div className="flex justify-start items-center text-base gap-4 my-1 font-medium">
                <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                <span>{getFullName(user)}</span>
            </div>
            {own?.id !== user.id && (
                <Tippy
                    visible={visible}
                    onClickOutside={() => setVisible(false)}
                    content={<RecipientOptionMenuContext recipient={user} setVisible={setVisible} />}
                    placement="bottom-start"
                    interactive={true}
                    animation="fade"
                >
                    <div
                        onClick={() => setVisible((prevState) => !prevState)}
                        className="p-2 relative hover:bg-[#686868] rounded-full"
                    >
                        <FiMoreHorizontal size={16} className="text-white" />
                    </div>
                </Tippy>
            )}
        </div>
    );
};
