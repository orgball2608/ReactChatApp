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
        if (chat.type === 'group') navigate('/groups');
    };

    return (
        <div className="flex justify-center items-center px-2 h-12 mt-16 gap-2 text-base font-medium box-border bg-simple-gray cursor-pointer">
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