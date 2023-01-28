import { ConversationType, User } from '../../utils/types';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { CircleX } from 'akar-icons';

type Props = {
    selectedUser: User | undefined;
    setSelectedUser: Dispatch<React.SetStateAction<User | undefined>>;
    setSelectedUsers: Dispatch<SetStateAction<User[]>>;
    type: ConversationType;
};

export const SelectedRecipientChip: FC<Props> = ({ setSelectedUser, selectedUser, setSelectedUsers, type }) => {
    const handleRemoveSelectedUser = () => {
        if (type === 'private') setSelectedUser(undefined);
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
