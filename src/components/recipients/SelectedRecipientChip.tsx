import { User } from '../../utils/types';
import React, { Dispatch, FC } from 'react';
import { CircleX } from 'akar-icons';
import { getDisplayName } from '../../utils/helpers';

type Props = {
    selectedUser: User | undefined;
    setSelectedUser: Dispatch<React.SetStateAction<User | undefined>>;
};

export const SelectedRecipientChip: FC<Props> = ({ setSelectedUser, selectedUser }) => {
    const handleRemoveSelectedUser = () => {
        setSelectedUser(undefined);
    };

    return (
        <div>
            <div className="flex justify-start gap-2 text-sm py-[2px] items-center border-[1px] border-border-conversations rounded-full px-2 bg-[#292828]">
                <span>{getDisplayName(selectedUser!)}</span>
                <div className="cursor-pointer">
                    <CircleX size={18} onClick={handleRemoveSelectedUser} />
                </div>
            </div>
        </div>
    );
};
