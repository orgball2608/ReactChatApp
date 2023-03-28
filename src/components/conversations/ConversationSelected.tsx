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
    const handleChangeType = (chat: ConversationTypeData) => {
        dispatch(changeType(chat.type));
        if (chat.type === 'group') {
            navigate('/groups');
        } else {
           navigate('/conversations');
        }
    };

    return (
        <div className="flex justify-center bg-dark-gray px-3 items-center h-10 w-full items-center box-border cursor-pointer border-r-[1px] border-border-conversations">
            <div className="flex justify-center items-center h-10 w-full bg-sidebar-background rounded-full gap-2 p-1 text-lg font-medium" >
            {ChatTypes.map((chat, index) => (
                <div
                    onClick={() => handleChangeType(chat)}
                    className={`rounded-full w-1/2 text-center py-1 ${
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
