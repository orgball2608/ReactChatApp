import { User } from '../../utils/types';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { CircleX } from 'akar-icons';

type Props = {
    selectedUser: User | undefined;
    setSelectedUsers: Dispatch<SetStateAction<User[]>>;
};

export const SelectedGroupRecipientChip: FC<Props> = ({ selectedUser, setSelectedUsers }) => {
    const handleRemoveSelectedUser = () => {
        setSelectedUsers((prev) => prev.filter((u) => u.id !== selectedUser?.id));
    };
    return (
        <div>
            <div className="flex justify-start gap-2 items-center">
                <span>{selectedUser?.email}</span>
                <div>
                    <CircleX size={18} onClick={handleRemoveSelectedUser} />
                </div>
            </div>
        </div>
    );
};