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
import { defaultGroupAvatar } from '../../utils/constants';
import { MediaListFile } from '../conversation-options/MediaListFile';
import { FileSideBar } from './FileSideBar';
import { GroupDefaultAvatar } from '../commons/GroupDefaultAvatar';
import { PrivacyAndSupport } from '../conversation-options/PrivacyAndSupport';
import { EmojiSelectModal } from '../modals/EmojiSelectModal';
import { ChangeNickNameModal } from '../modals/nicknames/ChangeNickNameModal';
import { ChangeThemeModal } from '../modals/ChangeThemeModal';
import { GroupAddMemberModal } from '../modals/members/GroupAddMemberModal';

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
    const [showMediaFileSideBar, setShowMediaFileSideBar] = useState<boolean>(false);
    const [showFileSideBar, setShowFileSideBar] = useState<boolean>(false);
    const [showChangeNickNameModal, setShowChangeNickNameModal] = useState(false);
    const [showChangeEmojiModal, setShowChangeEmojiModal] = useState(false);
    const [showChangeThemeModal, setShowChangeThemeModal] = useState(false);
    const showSidebar = useSelector((state: RootState) => state.settingSidebar.showSidebar);
    const [showAddMemberModal, setShowAddMemberModal] = useState<boolean>(false);

    useEffect(()=>{
        setShowMediaFileSideBar(false)
        setShowFileSideBar(false)
    },[id])

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
            {showChangeEmojiModal && <EmojiSelectModal setShowModal={setShowChangeEmojiModal} />}
            {showChangeNickNameModal && <ChangeNickNameModal setShowModal={setShowChangeNickNameModal} />}
            {showChangeThemeModal && <ChangeThemeModal setShowModal={setShowChangeThemeModal} />}
            {showAddMemberModal && <GroupAddMemberModal setShowModal={setShowAddMemberModal} />}
            {showMediaFileSideBar || showFileSideBar ? (
                <FileSideBar
                    setShowFileSideBar={setShowFileSideBar}
                    setShowMediaFileSideBar={setShowMediaFileSideBar}
                    showFileSideBar={showFileSideBar}
                    showMediaFileSideBar={showMediaFileSideBar}
                />
            ) : (
                <aside className={`lg:w-72 w-76 flex-none px-2 gap-4 flex flex-col border-border-conversations md:border-l-[1px] border-r-[1px] shrink-0 top-0 left-0 lg:sticky lg:translate-x-0 lg:bg-transparent lg:shadow-none
                    -translate-x-full fixed h-screen shadow-md transition bg-[#333335] duration-300 z-30 ${showSidebar && "translate-x-0"}`}>
                    <div className="flex flex-col gap-2 justify-center items-center mt-4 px-3">
                        {selectedGroup && selectedGroup?.avatar ? (
                            <LazyLoadImage
                                src={getGroupAvatar()}
                                alt="group_avatar"
                                className="w-28 h-28 rounded-full bg-white object-cover"
                                effect="blur"
                            />
                        ) : (
                            <GroupDefaultAvatar group={selectedGroup!} groupSize={28} itemSize={20} />
                        )}
                        <div className="flex flex-col items-center text-center break-all ">
                            <p className="text-center text-xl font-medium break-all">{selectedGroup?.title}</p>
                            <div className="flex text-sm flex-grow max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap">
                                <p className="text-gray-400">{selectedGroup?.users.length + ' Member • '}</p>
                                <p className={"text-green-500"}>{onlineUsers?.length + ' Online'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <CustomizeGroupOptions setShowModal={setShowModal} groupId={groupId} setShowChangeNickNameModal={setShowChangeNickNameModal} setShowChangeEmojiModal={setShowChangeEmojiModal} setShowChangeThemeModal={setShowChangeThemeModal} />
                        <GroupParticipantOptions
                            onlineUsers={onlineUsers}
                            offlineUsers={offlineUsers}
                            setShowAddMemberModal={setShowAddMemberModal}
                            groupId={groupId}
                        />
                        <MediaListFile
                            setShowFileSideBar={setShowFileSideBar}
                            setShowMediaFileSideBar={setShowMediaFileSideBar}
                        />
                        <PrivacyAndSupport />
                    </div>
                </aside>
            )}
        </>
    );
};
