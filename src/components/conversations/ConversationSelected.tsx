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
        <div className="flex justify-center h-14 w-80 items-center px-2 gap-2 text-base font-medium box-border bg-simple-gray cursor-pointer border-r-[1px] border-border-conversations">
            {ChatTypes.map((chat, index) => (
                <div
                    onClick={() => handleChangeType(chat)}
                    className={`rounded-md border-[#d3d3d3] border-solid border-[1px] bg-dark-light px-3 py-1 basis-2/4 text-center ${
                        selectedType === chat.type ? 'bg-[#b1b1b1] border-[#b1b1b1] text-[#292929]' : ''
                    }`}
                    key={index}
                >
                    {chat.label}
                </div>
            ))}
        </div>
    );
};
