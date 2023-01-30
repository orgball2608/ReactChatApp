import { User } from '../../utils/types';
import { FC, useEffect, useState } from 'react';
import { ChevronDown, ChevronRight } from 'akar-icons';

type Props = {
    onlineUsers: User[];
    offlineUsers: User[] | undefined;
    groupId: number;
};

export const GroupParticipantOptions: FC<Props> = ({ offlineUsers, onlineUsers, groupId }) => {
    const getFullName = (user: User) => user.lastName + ' ' + user.firstName;
    const [showParticipants, setShowParticipants] = useState<boolean>(false);
    const handleShowParticipants = () => {
        if (showParticipants) setShowParticipants(false);
        else setShowParticipants(true);
    };

    useEffect(() => {
        setShowParticipants(false);
    }, [groupId]);

    return (
        <div className="flex flex-col justify-center ml-2">
            <div
                className="text-lg flex items-center justify-between font-medium py-1 px-2 hover:bg-[#1c1e21] rounded-md"
                onClick={handleShowParticipants}
            >
                <span>Participants</span>
                <div className="px-1 py-1">
                    {showParticipants ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </div>
            </div>
            {showParticipants && (
                <div className="flex flex-col justify-center gap-2 px-2 overflow-y-scroll scrollbar-hide overflow-auto">
                    <div className="flex flex-col gap-2 justify-center">
                        <div className="text-base font-medium rounded-md">Online</div>
                        <div className="flex flex-col gap-2">
                            {onlineUsers?.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex justify-start items-center text-base gap-4 my-1 font-medium"
                                >
                                    <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                                    <span>{getFullName(user)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 justify-center">
                        <div className="text-base font-medium rounded-md">Offline</div>
                        <div>
                            {offlineUsers?.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex justify-start items-center text-base gap-4 my-1 font-medium"
                                >
                                    <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                                    <span>{getFullName(user)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
