import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { GroupVideoCallScreen } from '../../components/calls/groups/GroupVideoCallScreen';
import { GroupVoiceCallScreen } from '../../components/calls/groups/GroupVoiceCallScreen';

export const GroupCallPage = () => {
    const { groupCallType } = useSelector((state: RootState) => state.groupCalls);
    return (
        <div className="relative w-full h-full">
            {groupCallType === 'video' ? <GroupVideoCallScreen /> : <GroupVoiceCallScreen />}
        </div>
    );
};
