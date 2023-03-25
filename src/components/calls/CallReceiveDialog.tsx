import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { MdClose } from 'react-icons/md';
import { HandleCallType } from '../../utils/types';
import { useContext } from 'react';
import { SocketContext } from '../../contex/SocketContext';
import { defaultAvatar } from '../../utils/constants';
import { getDisplayName } from '../../utils/helpers';
import VideoCallIcon from '../icons/VideoCallIcon';
import { useNavigate } from 'react-router-dom';
import { resetState } from '../../store/callSlice';

export const CallReceiveDialog = () => {
    const { caller } = useSelector((state: RootState) => state.calls);
    const socket = useContext(SocketContext);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const handleCall = (type: HandleCallType) => {
        switch (type) {
            case 'accept': {
                socket.emit('videoCallAccepted', { caller });
                navigate('../../calls')
                break;
            }
            case 'reject':
                console.log('reject')
                dispatch(resetState())
                return socket.emit('videoCallRejected', { caller });
        }
    };
    return (
        <div className="w-full h-full bg-overlay-background fixed left-0 top-0 flex justify-center items-center z-40 ">
            <div className="w-[300px] h-[360px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-modal-background flex flex-col justify-center items-center gap-6 rounded-2xl">
                <div className="flex flex-col justify-center items-center gap-2">
                    <img src={caller?.profile?.avatar|| defaultAvatar} alt="avatar" className="w-32 h-32 rounded-full"/>
                    <p className="text-xl font-medium">
                        {getDisplayName(caller!)}
                    </p>
                   <p className="text-xl font-medium">
                       is calling...
                   </p>
                </div>
                <div className="flex justify-center items-center gap-12">
                    <div className="flex flex-col items-center gap-1">
                        <div className="cursor-pointer p-1 rounded-full bg-red-600" onClick={() => handleCall('reject')}>
                            <MdClose size={29} />
                        </div>
                        <p className="text-sm text-gray-400">
                            Reject
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="cursor-pointer p-[2px] rounded-full bg-green-600" onClick={() => handleCall('accept')}>
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