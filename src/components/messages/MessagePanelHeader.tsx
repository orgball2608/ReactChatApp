import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { useContext } from 'react';
import { AuthContext } from '../../contex/AuthContext';
import { FiMoreHorizontal } from 'react-icons/fi';
import { toggleSidebar } from '../../store/settingSidebarSlice';
import { getFullName } from '../../utils/helpers';

export const MessagePanelHeader = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useContext(AuthContext);
    const conversations = useSelector((state: RootState) => state.conversation.conversations);
    const conversation = conversations.find((con) => con.id == parseInt(id!));
    const selectedType = useSelector((state: RootState) => state.type.type);
    const groups = useSelector((state: RootState) => state.group.groups);
    const selectedGroup = groups.find((group) => group.id === parseInt(id!));

    const showSidebar = useSelector((state: RootState) => state.settingSidebar.showSidebar);
    const handleChangeSideState = () => {
        dispatch(toggleSidebar());
    };
    return (
        <header
            className="bg-dark-header border-b-[1px] border-solid border-border-conversations flex justify-between items-center px-8 box-border
    absolute top-0 left-0 w-full h-14 text-lg rounded z-8"
        >
            <div className="flex justify-center items-center gap-2">
                <div className={`w-10 h-10 rounded-full bg-red-500`}></div>
                <div> {selectedType === 'private' ? getFullName(user, conversation) : selectedGroup?.title}</div>
            </div>

            <div onClick={handleChangeSideState} className={`w-fit h-fit px-1 py-1 hover:bg-[#686868] rounded-full`}>
                <div className={`rounded-full p-[1px] ${showSidebar ? 'bg-white' : ''}`}>
                    <FiMoreHorizontal size={16} className={` ${showSidebar ? 'text-black' : 'text-white'}`} />
                </div>
            </div>
        </header>
    );
};
