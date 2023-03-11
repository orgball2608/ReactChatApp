import { Check } from 'akar-icons';
import { Dispatch, FC, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contex/AuthContext';
import { FriendType, User } from '../../utils/types';

type Props = {
    getRecipient: (friend: FriendType, user: User | undefined) => User | null;
    getAvatar: (friend: User) => string;
    friend: FriendType;
    setSelectedMembers: Dispatch<React.SetStateAction<User[]>>;
    memberChanged: User | undefined;
    selectedMembers: User[];
};

export const MemberItemSelect: FC<Props> = ({
    getRecipient,
    getAvatar,
    friend,
    setSelectedMembers,
    memberChanged,
    selectedMembers,
}) => {
    const [selected, setSelected] = useState(false);
    const { user } = useContext(AuthContext);
    const getDisplayName = (friend: User) => {
        return friend.firstName + ' ' + friend.lastName;
    };

    useEffect(() => {
        if (selectedMembers.some((member) => member.id === getRecipient(friend, user)!.id)) {
            setSelected(true);
        }
        if (memberChanged && memberChanged.id === getRecipient(friend, user)!.id) {
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
            onClick={() => handleSelectMember(getRecipient(friend, user)!)}
            key={friend.id}
            className="flex justify-between py-1 px-2 rounded-md items-center gap-2 hover:bg-[#908f8f] w-full cursor-pointer"
        >
            <div className="flex justify-start items-center gap-2">
                <img src={getAvatar(getRecipient(friend, user)!)} alt="avatar" className="rounded-full w-10 h-10" />
                <span className="text-base">{getDisplayName(getRecipient(friend, user)!)}</span>
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
