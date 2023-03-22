import { User } from '../../utils/types';
import { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react';
import { ChevronDown, ChevronRight } from 'akar-icons';
import { RecipientItem } from './RecipientItem';
import { AuthContext } from '../../contex/AuthContext';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { GoPlus } from 'react-icons/go';

type Props = {
    onlineUsers: User[];
    offlineUsers: User[] | undefined;
    groupId: number;
    setShowAddMemberModal: Dispatch<SetStateAction<boolean>>;
};

export const GroupParticipantOptions: FC<Props> = ({ offlineUsers, onlineUsers, groupId,setShowAddMemberModal }) => {
    const [showParticipants, setShowParticipants] = useState<boolean>(false);

    const { user } = useContext(AuthContext);
    const groups = useSelector((state: RootState) => state.group.groups);
    const selectedGroup = groups.find((item) => item.id === groupId);

    useEffect(() => {
        setShowParticipants(false);
    }, [groupId]);

    const handleShowParticipants = () => {
        if (showParticipants) setShowParticipants(false);
        else setShowParticipants(true);
    };

    return (
        <div className="flex flex-col h-full justify-center ml-2 relative">
            <div
                className="flex items-center justify-between py-2 px-2 hover:bg-[#1c1e21] rounded-md cursor-pointer"
                onClick={handleShowParticipants}
            >
                <span className="text-base text-white font-medium text-[#fcfcfc]">Participants</span>
                <div className="px-1 py-1">
                    {showParticipants ?  <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </div>
            </div>
            {showParticipants && (
                <div className="flex flex-col justify-center px-2 ">
                    <div className="flex flex-col gap-2">
                        {onlineUsers&&onlineUsers?.length > 0 &&  onlineUsers?.map((user) => (
                            <RecipientItem user={user} key={user.id} isOnline={true} />
                        ))}
                    </div>
                    <div className="flex flex-col gap-2">
                        { offlineUsers && offlineUsers?.length > 0 &&  offlineUsers?.map((user) => (
                            <RecipientItem user={user} key={user.id} isOnline={false} />
                        ))
                        }
                    </div>
                    {user?.id === selectedGroup?.owner.id && (
                        <div
                            onClick={() => setShowAddMemberModal(true)}
                            className="flex justify-start gap-2 items-center rounded-md py-1 hover:bg-[#1c1e21] cursor-pointer"
                        >
                            <div className="p-[6px] rounded-full text-white bg-[#373434] text-primary">
                                <GoPlus size={20} />
                            </div>
                            <span className="text-base text-primary font-medium">Add Member</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
