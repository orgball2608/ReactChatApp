import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ChevronRight } from 'akar-icons';
import { useContext, useEffect, useState } from 'react';
import { GroupParticipantList } from '../conversation-options/GroupParticipantList';
import { AuthContext } from '../../contex/AuthContext';
import { SocketContext } from '../../contex/SocketContext';
import { User } from '../../utils/types';

export const ConversationSettingSideBar = () => {
    const { id } = useParams();
    const groupId = parseInt(id!);
    const groups = useSelector((state: RootState) => state.group.groups);
    const selectedGroup = groups.find((group) => group.id === groupId);
    const [showParticipants, setShowParticipants] = useState<boolean>(false);

    const { user } = useContext(AuthContext);
    const socket = useContext(SocketContext);
    const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
    const [offlineUsers, setOfflineUsers] = useState<User[] | undefined>([]);

    useEffect(() => {
        if (user) setOnlineUsers((prev) => [...prev, user]);
        setOfflineUsers(selectedGroup?.users.filter((u) => u.id !== user?.id));
        socket.emit('getOnlineGroupUsers', { groupId });
        const interval = setInterval(() => {
            socket.emit('getOnlineGroupUsers', { groupId, userId: user?.id });
        }, 10000);
        socket.on('onlineGroupUsersReceived', (payload) => {
            setOnlineUsers(payload.onlineUsers);
            setOfflineUsers(payload.offlineUsers);
        });
        return () => {
            clearInterval(interval);
            socket.off('onlineGroupUsersReceived');
            setOfflineUsers([]);
            setOnlineUsers([]);
        };
    }, [groupId]);

    useEffect(() => {
        setShowParticipants(false);
    }, [groupId]);

    const handleShowParticipants = () => {
        if (showParticipants) setShowParticipants(false);
        else setShowParticipants(true);
    };

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
                {showParticipants && <GroupParticipantList onlineUsers={onlineUsers} offlineUsers={offlineUsers} />}
            </div>
        </aside>
    );
};
