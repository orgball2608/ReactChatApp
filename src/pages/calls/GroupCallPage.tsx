import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { VoiceCallScreen } from '../../components/calls/VoiceCallScreen';
import { GroupVideoCallScreen } from '../../components/calls/groups/GroupVideoCallScreen';

export const GroupCallPage = () => {
    const { groupCallType } = useSelector((state: RootState) => state.groupCalls);
    return (
        <div className="relative w-full h-full">
            {groupCallType === 'video' ? <GroupVideoCallScreen /> : <VoiceCallScreen />}
        </div>
    );
};
