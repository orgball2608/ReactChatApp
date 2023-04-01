import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { MdClose } from 'react-icons/md';
import { HandleCallType } from '../../../utils/types';
import { useContext } from 'react';
import { SocketContext } from '../../../contex/SocketContext';
import { CallEvents, defaultAvatar } from '../../../utils/constants';
import { getDisplayName } from '../../../utils/helpers';
import VideoCallIcon from '../../icons/VideoCallIcon';
import { resetState } from '../../../store/callSlice';
import { setGroupLocalStream } from '../../../store/groupCallSlice';

export const GroupCallReceiveDialog = () => {
    const { initiator,groupCallType,activeGroupId } = useSelector((state: RootState) => state.groupCalls);
    const socket = useContext(SocketContext);
    const dispatch = useDispatch<AppDispatch>();
    const handleCall = async(type: HandleCallType) => {
        const payload = { caller: initiator, groupId: activeGroupId};
        switch (type) {
            case 'accept': {
                const constraints = { video: groupCallType === 'video', audio: true };
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                dispatch(setGroupLocalStream(stream));
                socket.emit(CallEvents.GROUP_CALL_ACCEPT, payload);
                break;
            }
            case 'reject':
                dispatch(resetState())
                return socket.emit(CallEvents.GROUP_CALL_REJECT, payload)
        }
    };
    return (
        <div className="w-full h-full bg-overlay-background fixed left-0 top-0 flex justify-center items-center z-40 ">
            <div className="w-[300px] h-[360px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-modal-background flex flex-col justify-center items-center gap-6 rounded-2xl">
                <div className="flex flex-col justify-center items-center gap-4">
                    <img src={initiator?.profile?.avatar|| defaultAvatar} alt="avatar" className="w-32 h-32 rounded-full"/>
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-2xl font-semibold">
                            {getDisplayName(initiator!)}
                        </p>
                        <p className="text-base text-gray-400">
                            wants to {groupCallType === 'audio' ? 'voice' : 'video'} call you
                        </p>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-16">
                    <div className="flex flex-col items-center gap-1">
                        <div className="cursor-pointer p-1 rounded-full bg-red-600 flex justify-center items-center" onClick={() => handleCall('reject')}>
                            <MdClose size={28} />
                        </div>
                        <p className="text-sm text-gray-400">
                            Reject
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="cursor-pointer p-[2px] rounded-full bg-green-600 flex justify-center items-center" onClick={() => handleCall('accept')}>
                            <VideoCallIcon className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-sm text-gray-400">
                            Accept
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};