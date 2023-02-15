import { User } from '../../utils/types';
import { FC, useContext, useEffect, useState } from 'react';
import { ChevronDown, ChevronRight, Plus } from 'akar-icons';
import { RecipientItem } from './RecipientItem';
import { GroupAddMemberModal } from '../modals/GroupAddMemberModal';
import { AuthContext } from '../../contex/AuthContext';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SpinLoading } from '../commons/SpinLoading';

type Props = {
    onlineUsers: User[];
    offlineUsers: User[] | undefined;
    groupId: number;
};

export const GroupParticipantOptions: FC<Props> = ({ offlineUsers, onlineUsers, groupId }) => {
    const [showParticipants, setShowParticipants] = useState<boolean>(false);
    const [showAddMemberModal, setShowAddMemberModal] = useState<boolean>(false);
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
        <>
            {showAddMemberModal && <GroupAddMemberModal setShowModal={setShowAddMemberModal} />}
            <div className="flex flex-col h-full justify-center ml-2 relative">
                <div
                    className="text-lg flex items-center justify-between font-medium py-2 px-2 hover:bg-[#1c1e21] rounded-md cursor-pointer"
                    onClick={handleShowParticipants}
                >
                    <span className="font-semibold">Participants</span>
                    <div className="px-1 py-1">
                        {showParticipants ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </div>
                </div>
                {showParticipants && (
                    <div className="flex flex-col justify-center gap-2 px-2 ">
                        <div className="flex flex-col gap-2 justify-center">
                            <div className="flex justify-between items-center">
                                <div className="text-base font-medium rounded-md">Online</div>
                                <div className="text-base font-medium text-green-600 mr-2">({onlineUsers?.length})</div>
                            </div>

                            <div className="flex flex-col gap-2">
                                {onlineUsers?.length === 0 ? (
                                    <SpinLoading />
                                ) : (
                                    onlineUsers?.map((user) => (
                                        <RecipientItem user={user} key={user.id} isOnline={true} />
                                    ))
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 justify-center">
                            <div className="flex justify-between items-center text-base font-medium">
                                <div className=" rounded-md">Offline</div>
                                <div className=" text-red-600 mr-2">({offlineUsers?.length})</div>
                            </div>
                            <div className="flex flex-col gap-2">
                                {offlineUsers?.length === 0 ? (
                                    <div className="text-base font-medium text-gray-400 flex justify-center items-center">
                                        No offline members
                                    </div>
                                ) : (
                                    offlineUsers?.map((user) => (
                                        <RecipientItem user={user} key={user.id} isOnline={false} />
                                    ))
                                )}
                            </div>
                        </div>
                        {user?.id === selectedGroup?.owner.id && (
                            <div
                                onClick={() => setShowAddMemberModal(true)}
                                className="flex justify-start gap-2 items-center rounded-md px-1 py-2 hover:bg-[#1c1e21] cursor-pointer"
                            >
                                <div className="p-2 rounded-full text-white bg-[#373434]">
                                    <Plus size={18} />
                                </div>
                                <span className="text-md">Add Member</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};
