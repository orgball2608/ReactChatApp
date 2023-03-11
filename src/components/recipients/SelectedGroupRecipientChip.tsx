import { User } from '../../utils/types';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { CircleX } from 'akar-icons';
import { getDisplayName } from '../../utils/helpers';

type Props = {
    selectedUser: User | undefined;
    setSelectedUsers: Dispatch<SetStateAction<User[]>>;
};

export const SelectedGroupRecipientChip: FC<Props> = ({ selectedUser, setSelectedUsers }) => {
    const handleRemoveSelectedUser = () => {
        setSelectedUsers((prev) => prev.filter((u) => u.id !== selectedUser?.id));
    };

    return (
        <div className="flex justify-start gap-2 items-center border-[1px] border-border-conversations rounded-full pl-2 pr-1 py-[2px] bg-[#211f1f] animate-fade-in">
            <span className="text-white text-sm">{getDisplayName(selectedUser!)}</span>
            <div className="cursor-pointer">
                <CircleX size={18} onClick={handleRemoveSelectedUser} />
            </div>
        </div>
    );
};
