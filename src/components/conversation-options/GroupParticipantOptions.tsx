import { User } from '../../utils/types';
import { FC, useEffect, useState } from 'react';
import { ChevronDown, ChevronRight } from 'akar-icons';
import { RecipientItem } from './RecipientItem';

type Props = {
    onlineUsers: User[];
    offlineUsers: User[] | undefined;
    groupId: number;
};

export const GroupParticipantOptions: FC<Props> = ({ offlineUsers, onlineUsers, groupId }) => {
    const [showParticipants, setShowParticipants] = useState<boolean>(false);

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
                className="text-lg flex items-center justify-between font-medium py-1 px-2 hover:bg-[#1c1e21] rounded-md"
                onClick={handleShowParticipants}
            >
                <span>Participants</span>
                <div className="px-1 py-1">
                    {showParticipants ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </div>
            </div>
            {showParticipants && (
                <div className="flex flex-col justify-center gap-2 px-2">
                    <div className="flex flex-col gap-2 justify-center">
                        <div className="flex justify-between items-center">
                            <div className="text-base font-medium rounded-md">Online</div>
                            <div className="text-base font-medium text-green-600 mr-2">({onlineUsers?.length})</div>
                        </div>

                        <div className="flex flex-col gap-2">
                            {onlineUsers?.map((user) => (
                                <RecipientItem user={user} key={user.id} />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 justify-center">
                        <div className="flex justify-between items-center text-base font-medium">
                            <div className=" rounded-md">Offline</div>
                            <div className=" text-red-600 mr-2">({offlineUsers?.length})</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            {offlineUsers?.map((user) => (
                                <RecipientItem user={user} key={user.id} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
