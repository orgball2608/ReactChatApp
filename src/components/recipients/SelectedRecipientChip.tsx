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
            <div className="flex justify-start gap-2 items-center">
                <span>{getDisplayName(selectedUser!)}</span>
                <div>
                    <CircleX size={18} onClick={handleRemoveSelectedUser} />
                </div>
            </div>
        </div>
    );
};
