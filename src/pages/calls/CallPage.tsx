import { VideoCallScreen } from '../../components/calls/VideoCallScreen';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { VoiceCallScreen } from '../../components/calls/VoiceCallScreen';

export const CallPage = () => {
    const {callType } = useSelector(
        (state: RootState) => state.calls
    );

   return <div className="relative w-full h-full">
       {
           callType==='video' ? <VideoCallScreen/> : <VoiceCallScreen/>
       }
   </div>
}