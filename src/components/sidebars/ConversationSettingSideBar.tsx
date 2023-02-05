import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contex/AuthContext';
import { RootState } from '../../store';
import { getFullName } from '../../utils/helpers';
import { CustomizeConversationOptions } from '../conversation-options/CustomizeConversationOptions';

export const ConversationSettingSideBar = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const conversationId = parseInt(id!);
    const conversation = useSelector((state: RootState) => state.conversation.conversations);
    const selectedConversation = conversation.find((group) => group.id === conversationId);
    return (
        <>
            <aside className="w-72 flex-none bg-[#141414] px-2 gap-4 flex flex-col border-border-conversations border-l-[1px] ">
                <div className="flex flex-col gap-2 justify-center items-center mt-4 px-3 ">
                    <div className="w-28 h-28 rounded-full bg-blue-500"></div>
                    <div className="flex flex-col text-2xl">
                        <span className="text-center break-all">{getFullName(user, selectedConversation)}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2 justify-center">
                    <CustomizeConversationOptions />
                </div>
            </aside>
        </>
    );
};
