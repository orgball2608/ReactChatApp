import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useContext, useEffect, useState } from 'react';
import { GroupParticipantOptions } from '../conversation-options/GroupParticipantOptions';
import { AuthContext } from '../../contex/AuthContext';
import { SocketContext } from '../../contex/SocketContext';
import { User } from '../../utils/types';
import { CustomizeGroupOptions } from '../conversation-options/CustomizeGroupOptions';
import { ChangeGroupTitleModal } from '../modals/ChangeGroupTitleModal';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import defaultGroupAvatar from '../../__assets__/groupAvatar.png';
import { MediaListFile } from '../conversation-options/MediaListFile';
import { MediaFileSideBar } from '../conversation-options/MediaFileSideBar';

export const GroupSettingSideBar = () => {
    const { id } = useParams();
    const groupId = parseInt(id!);
    const groups = useSelector((state: RootState) => state.group.groups);
    const selectedGroup = groups.find((group) => group.id === groupId);
    const [showModal, setShowModal] = useState<boolean>(false);

    const { user } = useContext(AuthContext);
    const socket = useContext(SocketContext);
    const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
    const [offlineUsers, setOfflineUsers] = useState<User[] | undefined>([]);
    const [showFileSideBar, setShowFileSideBar] = useState<boolean>(false);

    useEffect(() => {
        if (user) setOnlineUsers((prev) => [...prev, user]);
        socket.emit('getOnlineGroupUsers', { groupId, userId: user?.id });
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

    const getGroupAvatar = () => {
        if (selectedGroup?.avatar) {
            return selectedGroup.avatar;
        } else {
            return defaultGroupAvatar;
        }
    };

    return (
        <>
            {showModal && <ChangeGroupTitleModal setShowModal={setShowModal} selectedGroup={selectedGroup} />}

            {showFileSideBar ? (
                <MediaFileSideBar setShowFileSideBar={setShowFileSideBar} />
            ) : (
                <aside className="w-72 flex-none bg-[#141414] px-2 gap-4 flex flex-col border-border-conversations border-l-[1px] overflow-y-auto ">
                    <div className="flex flex-col gap-2 justify-center items-center mt-4 px-3 ">
                        <LazyLoadImage
                            src={getGroupAvatar()}
                            alt="group_avatar"
                            className="w-28 h-28 rounded-full bg-white object-cover"
                            effect="blur"
                        />
                        <div className="flex flex-col text-2xl">
                            <span className="text-center break-all">{selectedGroup?.title}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 justify-center">
                        <CustomizeGroupOptions setShowModal={setShowModal} groupId={groupId} />
                        <GroupParticipantOptions
                            onlineUsers={onlineUsers}
                            offlineUsers={offlineUsers}
                            groupId={groupId}
                        />
                        <MediaListFile setShowFileSideBar={setShowFileSideBar} />
                    </div>
                </aside>
            )}
        </>
    );
};
