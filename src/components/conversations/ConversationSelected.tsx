import { ConversationTypes } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import { changeType } from '../../store/typeSlice';
import { ConversationTypeData } from '../../utils/types';

export const ConversationSelected = () => {
    const ChatTypes = ConversationTypes;
    const selectedType = useSelector((state: RootState) => state.type.type);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const firstConversation = useSelector((state: RootState) => state.conversation.conversations)[0];
    const firstGroup = useSelector((state: RootState) => state.group.groups)[0];
    const handleChangeType = (chat: ConversationTypeData) => {
        dispatch(changeType(chat.type));
        if (chat.type === 'group') {
            if (firstGroup) navigate(`/groups/${firstGroup.id}`);
            else navigate('/groups');
        } else {
            if (firstConversation) navigate(`/conversations/${firstConversation.id}`);
            else navigate('/conversations');
        }
    };

    return (
        <div className="flex justify-center h-10 w-full px-2 items-center box-border cursor-pointer border-r-[1px] border-border-conversations">
            <div className="flex justify-center h-10 w-full bg-sidebar-background rounded-full items-center gap-2 px-1 py-[6px] text-sm" >
            {ChatTypes.map((chat, index) => (
                <div
                    onClick={() => handleChangeType(chat)}
                    className={`rounded-full w-1/2 px-1 py-2 text-center ${
                        selectedType === chat.type ? 'bg-dark-lighten text-white ' : 'text-gray-400'
                    }`}
                    key={index}
                >
                    {chat.label}
                </div>
            ))}
            </div>
            
        </div>
    );
};
