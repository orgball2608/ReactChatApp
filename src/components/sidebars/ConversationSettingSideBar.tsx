import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { useContext, useEffect, useState } from 'react';
import { GroupParticipantOptions } from '../conversation-options/GroupParticipantOptions';
import { AuthContext } from '../../contex/AuthContext';
import { SocketContext } from '../../contex/SocketContext';
import { User } from '../../utils/types';
import { CustomizeConversationOptions } from '../conversation-options/CustomizeConversationOptions';
import { ChangeGroupTitleModal } from '../modals/ChangeGroupTitleModal';

export const ConversationSettingSideBar = () => {
    const { id } = useParams();
    const groupId = parseInt(id!);
    const groups = useSelector((state: RootState) => state.group.groups);
    const selectedGroup = groups.find((group) => group.id === groupId);
    const [showModal, setShowModal] = useState<boolean>(false);

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

    return (
        <>
            {showModal && <ChangeGroupTitleModal setShowModal={setShowModal} selectedGroup={selectedGroup} />}

            <aside className="w-72 flex-none bg-[#141414] px-2 gap-4 flex flex-col border-border-conversations border-l-[1px] ">
                <div className="flex flex-col gap-2 justify-center items-center mt-4 px-3 ">
                    <div className="w-28 h-28 rounded-full bg-blue-500"></div>
                    <div className="flex flex-col text-2xl">
                        <span className="text-center break-all">{selectedGroup?.title}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2 justify-center">
                    <CustomizeConversationOptions setShowModal={setShowModal} groupId={groupId} />
                    <GroupParticipantOptions onlineUsers={onlineUsers} offlineUsers={offlineUsers} groupId={groupId} />
                </div>
            </aside>
        </>
    );
};
