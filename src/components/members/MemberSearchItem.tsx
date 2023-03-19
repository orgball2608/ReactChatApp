import { Check } from 'akar-icons';
import React, { Dispatch, FC, useEffect, useState } from 'react';
import { User } from '../../utils/types';
import { getAvatar } from '../../utils/helpers';

type Props = {
    friend: User;
    setSelectedMembers: Dispatch<React.SetStateAction<User[]>>;
    memberChanged: User | undefined;
    selectedMembers: User[];
};

export const MemberSearchItem: FC<Props> = ({
    friend,
    setSelectedMembers,
    memberChanged,
    selectedMembers,
}) => {
    const [selected, setSelected] = useState(false);
    const getDisplayName = (friend: User) => {
        return friend.firstName + ' ' + friend.lastName;
    };

    useEffect(() => {
        if (selectedMembers.some((member) => member.id === friend!.id)) {
            setSelected(true);
        }
        if (memberChanged && memberChanged.id === friend!.id) {
            setSelected(false);
        }
    }, [memberChanged]);

    const handleSelectMember = (friend: User) => {
        if (!selected) {
            setSelectedMembers((prev) => [...prev, friend]);
        } else {
            setSelectedMembers((prev) => prev.filter((member) => member.id !== friend.id));
        }
        setSelected((prev) => !prev);
    };

    return (
        <div
            onClick={() => handleSelectMember(friend)}
            key={friend.id}
            className="flex justify-between py-1 px-2 rounded-md items-center gap-2 hover:bg-[#28282b] w-full cursor-pointer"
        >
            <div className="flex justify-start items-center gap-2">
                <img src={getAvatar(friend!)} alt="avatar" className="rounded-full w-10 h-10" />
                <span className="text-base">{getDisplayName(friend!)}</span>
            </div>

            <div className="bg-white border-[2px] border-[#484c51] w-5 h-5 rounded-sm">
                {selected && (
                    <div className="bg-blue-500">
                        <Check size={16} className="text-dark-light" />
                    </div>
                )}
            </div>
        </div>
    );
};
