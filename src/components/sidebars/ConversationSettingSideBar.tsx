import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { User } from '../../utils/types';
import { ChevronRight } from 'akar-icons';
import { useEffect, useState } from 'react';

export const ConversationSettingSideBar = () => {
    const { id } = useParams();
    const getFullName = (user: User) => user.lastName + ' ' + user.firstName;
    const groups = useSelector((state: RootState) => state.group.groups);
    const selectedGroup = groups.find((group) => group.id === parseInt(id!));
    const [showParticipants, setShowParticipants] = useState<boolean>(false);
    const handleShowParticipants = () => {
        if (showParticipants) setShowParticipants(false);
        else setShowParticipants(true);
    };

    useEffect(() => {
        setShowParticipants(false);
    }, [id]);

    return (
        <aside className="w-72 flex-none bg-[#141414] px-2 gap-2 flex flex-col border-border-conversations border-l-[1px] ">
            <div className="flex flex-col gap-2 justify-center items-center mt-4 px-3 break-all">
                <div className="w-28 h-28 rounded-full bg-blue-500"></div>
                <div className="flex flex-col text-2xl">
                    <span>{selectedGroup?.title}</span>
                </div>
            </div>
            <div className="flex flex-col justify-center ml-2 mt-2">
                <div
                    className="text-xl flex items-center justify-between font-medium py-1 px-2 hover:bg-[#1c1e21] rounded-md my-2"
                    onClick={handleShowParticipants}
                >
                    <span>Participants</span>
                    <div className="px-1 py-1">
                        <ChevronRight size={20} />
                    </div>
                </div>
                {showParticipants && (
                    <div className="flex flex-col gap-2">
                        {selectedGroup?.users.map((user) => (
                            <div
                                key={user.id}
                                className="flex justify-start items-center text-base gap-4 my-1 font-medium"
                            >
                                <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                                <span>{getFullName(user)}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </aside>
    );
};
