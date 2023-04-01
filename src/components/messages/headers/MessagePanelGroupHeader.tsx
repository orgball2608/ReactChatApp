import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { useContext, useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { toggleSidebar } from '../../../store/settingSidebarSlice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { GroupMemberViewModal } from '../../modals/members/GroupMemberViewModal';
import { GroupDefaultAvatar } from '../../commons/GroupDefaultAvatar';
import { useCurrentViewportView } from '../../../hooks/useCurrentViewportView';
import { FaChevronLeft } from 'react-icons/fa';
import CallIcon from '../../icons/CallIcon';
import VideoCallIcon from '../../icons/VideoCallIcon';
import { AuthContext } from '../../../contex/AuthContext';
import {
    setActiveGroupId,
    setGroupCallType,
    setGroupLocalStream,
    setInitiator,
    setParticipants,
} from '../../../store/groupCallSlice';
import { SocketContext } from '../../../contex/SocketContext';
import { CallEvents } from '../../../utils/constants';

export const MessagePanelGroupHeader = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [showGroupMember, setShowGroupMember] = useState<boolean>(false);
    const groups = useSelector((state: RootState) => state.group.groups);
    const showSidebar = useSelector((state: RootState) => state.settingSidebar.showSidebar);
    const selectedGroup = groups.find((group) => group.id === parseInt(id!));
    const socket = useContext(SocketContext);
    const { isMobile } = useCurrentViewportView();

    const getAvatar = () => {
        if (selectedGroup?.avatar)
            return (
                <LazyLoadImage
                    src={selectedGroup?.avatar}
                    alt="avatar"
                    effect="blur"
                    className={`w-9 h-9 rounded-full object-cover bg-white`}
                />
            );
        return <GroupDefaultAvatar group={selectedGroup!} groupSize={10} itemSize={7} />;
    };
    const handleChangeSideState = () => {
        dispatch(toggleSidebar());
    };

    const handleRedirectHome = () => {
        navigate('../../groups');
    };

    const handleDirectProfile = () => {
        setShowGroupMember(true);
    };

    const handleVideoCall = async () => {
        if (!user) return console.log('User undefined');
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
        if (!stream) return;
        dispatch(setGroupLocalStream(stream));
        dispatch(setActiveGroupId(selectedGroup!.id));
        dispatch(setInitiator(user!));
        dispatch(setGroupCallType('video'));
        socket.emit(CallEvents.GROUP_VIDEO_CALL_INITIATE, {
            groupId: selectedGroup!.id,
        });
    };

    const handleGroupVoiceCall = async () => {
        if (!user) return console.log('User undefined');
        const users = selectedGroup!.users;
        const stream = await navigator.mediaDevices.getUserMedia({
            video: false,
            audio: true,
        });
        if (!stream) return;
        dispatch(setGroupLocalStream(stream));
        dispatch(setActiveGroupId(selectedGroup!.id));
        dispatch(setParticipants(users));
        dispatch(setInitiator(user!));
        dispatch(setGroupCallType('audio'));
        socket.emit(CallEvents.GROUP_VOICE_CALL_INITIATE, {
            groupId: selectedGroup!.id,
        });
    };

    return (
        <>
            {showGroupMember && <GroupMemberViewModal setShowModal={setShowGroupMember} group={selectedGroup} />}
            <header
                className="border-b-[1px] border-solid border-border-conversations flex items-center pl-2 pr-4 box-border
    absolute top-0 left-0 w-full h-14 z-10"
            >
                {isMobile && (
                    <div onClick={handleRedirectHome} className="rounded-full p-2 hover:bg-[#2d3133] cursor-pointer">
                        <FaChevronLeft size={20} className="text-primary" />
                    </div>
                )}
                <div className="flex justify-between items-center w-full">
                    <div
                        onClick={handleDirectProfile}
                        className="flex justify-center items-center gap-2 px-2 py-1 rounded-md cursor-pointer hover:bg-[#2d3133] "
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full relative flex justify-center items-center">
                                {getAvatar()}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="text-lg max-w-[140px] md:max-w-[400px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                                {selectedGroup?.title}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <div
                            onClick={handleGroupVoiceCall}
                            className="rounded-full p-[2px] hover:bg-[#2d3133] flex justify-center items-center cursor-pointer"
                        >
                            <CallIcon className="w-8 h-8 rounded-full text-primary" />
                        </div>
                        <div
                            onClick={handleVideoCall}
                            className="rounded-full p-[2px] hover:bg-[#2d3133] flex justify-center items-center cursor-pointer"
                        >
                            <VideoCallIcon className="w-8 h-8 rounded-full text-primary" />
                        </div>
                        <div
                            onClick={handleChangeSideState}
                            className={`w-fit h-fit p-2 hover:bg-[#2d3133] rounded-full cursor-pointer`}
                        >
                            <div className={`rounded-full p-[1px] ${showSidebar ? 'bg-primary' : ''}`}>
                                <FiMoreHorizontal
                                    size={16}
                                    className={` ${showSidebar ? 'text-black' : 'text-primary'}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};
