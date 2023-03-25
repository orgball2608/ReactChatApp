import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contex/AuthContext';
import { FiMoreHorizontal } from 'react-icons/fi';
import { toggleSidebar } from '../../store/settingSidebarSlice';
import { getFullName, getRecipient } from '../../utils/helpers';
import { defaultAvatar } from '../../utils/constants';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { GroupMemberViewModal } from '../modals/members/GroupMemberViewModal';
import { GroupDefaultAvatar } from '../commons/GroupDefaultAvatar';
import { useCurrentViewportView } from '../../hooks/useCurrentViewportView';
import { FaChevronLeft } from 'react-icons/fa';
import CallIcon from '../icons/CallIcon';
import VideoCallIcon from '../icons/VideoCallIcon';
import { SocketContext } from '../../contex/SocketContext';
import { setActiveConversationId, setCaller, setLocalStream, setReceiver } from '../../store/callSlice';

export const MessagePanelHeader = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const conversations = useSelector((state: RootState) => state.conversation.conversations);
    const [showGroupMember, setShowGroupMember] = useState<boolean>(false);
    const conversation = conversations.find((con) => con.id === parseInt(id!));
    const selectedType = useSelector((state: RootState) => state.type.type);
    const groups = useSelector((state: RootState) => state.group.groups);
    const onlineFriends = useSelector((state: RootState) => state.friends.onlineFriends);
    const showSidebar = useSelector((state: RootState) => state.settingSidebar.showSidebar);
    const selectedGroup = groups.find((group) => group.id === parseInt(id!));
    const { isMobile } = useCurrentViewportView();
    const socket = useContext(SocketContext);
    
    const recipient = getRecipient(conversation!, user!);
    const isOnline = !!onlineFriends.find((friend) => friend.id === recipient?.id);

    const getAvatar = () => {
        if (selectedType === 'private') {
            if (recipient?.profile) {
                if (recipient.profile.avatar)
                    return (
                        <LazyLoadImage
                            src={recipient.profile.avatar}
                            alt="avatar"
                            effect="blur"
                            className={`w-9 h-9 rounded-full object-cover bg-white`}
                        />
                    );
            }
            return (
                <LazyLoadImage
                    src={defaultAvatar}
                    alt="avatar"
                    effect="blur"
                    className={`w-9 h-9 rounded-full object-cover bg-white`}
                />
            );
        } else {
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
        }
    };
    const handleChangeSideState = () => {
        dispatch(toggleSidebar());
    };

    const handleRedirectHome= ()=>{
        if (selectedType === 'private') {
            navigate('../../conversations')
        } else {
            navigate('../../groups')
        }
    }

    const handleDirectProfile = () => {
        if (selectedType === 'private') {
            navigate(`../../friend/profile/${recipient?.id}`);
        } else {
            setShowGroupMember(true);
        }
    };

    const handleVideoCall = async () => {
        if (!recipient) return console.log('Recipient undefined');
        if (!user) return console.log('User undefined');
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
        if(!stream) return;
        dispatch(setLocalStream(stream));
        dispatch(setActiveConversationId(conversation!.id))
        dispatch(setReceiver(recipient))
        dispatch(setCaller(user!))
        navigate('../../calls')
        socket.emit('onVideoCallCreated', {
            conversationId: conversation?.id,
            recipientId: recipient.id,
        });
    };

    return (
        <>
            {showGroupMember && <GroupMemberViewModal setShowModal={setShowGroupMember} group={selectedGroup} />}
            <header
                className="border-b-[1px] border-solid border-border-conversations flex gap-2 items-center pl-2 pr-4 box-border
    absolute top-0 left-0 w-full h-14 z-10"
            >
                {(isMobile) && (
                    <div
                        onClick={handleRedirectHome}
                        className="rounded-full p-2 hover:bg-[#2d3133] cursor-pointer">
                        <FaChevronLeft size={20} className="text-primary"/>
                    </div>
                )}
                <div className="flex justify-between items-center w-full">
                    <div
                        onClick={handleDirectProfile}
                        className="flex justify-center items-center gap-2 px-2 py-1 rounded-md cursor-pointer hover:bg-[#2d3133] "
                    >
                        <div
                            className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-full relative flex justify-center items-center">
                                {getAvatar()}
                                {isOnline && (
                                    <div className="w-2 h-2 p-1 rounded-full absolute bottom-0 right-1 bg-green-500"></div>
                                )}
                            </div>

                        </div>
                        <div className="flex flex-col justify-center">
                        <span className="text-base font-medium max-w-[180px] lg:max-w-[400px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                            {selectedType === 'private' ? getFullName(user, conversation) : selectedGroup?.title}
                        </span>
                            {isOnline && (
                                <span className="text-sm text-gray-400">
                                {selectedType === 'private' ? 'Online' : 'Group'}
                            </span>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <div className="rounded-full p-[2px] hover:bg-[#2d3133] flex justify-center items-center cursor-pointer">
                            <CallIcon className="w-8 h-8 rounded-full text-primary"/>
                        </div>
                        <div
                            onClick={handleVideoCall}
                            className="rounded-full p-[2px] hover:bg-[#2d3133] flex justify-center items-center cursor-pointer">
                            <VideoCallIcon className="w-8 h-8 rounded-full text-primary"/>
                        </div>
                        <div
                            onClick={handleChangeSideState}
                            className={`w-fit h-fit p-2 hover:bg-[#2d3133] rounded-full cursor-pointer`}
                        >
                            <div className={`rounded-full p-[1px] ${showSidebar ? 'bg-primary' : ''}`}>
                                <FiMoreHorizontal size={16} className={` ${showSidebar ? 'text-black' : 'text-primary'}`} />
                            </div>
                        </div>

                    </div>


                </div>

            </header>
        </>
    );
};
