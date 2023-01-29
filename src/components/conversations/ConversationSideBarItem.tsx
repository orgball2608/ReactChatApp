import { Conversation } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import { FC, useContext } from 'react';
import { AuthContext } from '../../contex/AuthContext';

type Props = {
    conversation: Conversation;
};
export const ConversationSideBarItem: FC<Props> = ({ conversation }) => {
    const { user } = useContext(AuthContext);
    const getDisplayUser = (conversation: Conversation) => {
        return conversation.creator.id === user?.id ? conversation.recipient : conversation.creator;
    };
    const navigate = useNavigate();
    return (
        <div
            className={
                'flex justify-start mt-42 items-center gap-5 px-8 py-3 box-border border-b-[1px] border-solid border-border-conversations bg-simple-gray'
            }
            onClick={() => {
                navigate(`/conversations/${conversation.id}`);
            }}
            key={conversation.id}
        >
            <div className="bg-white h-12 w-12 rounded-full bg-blue-500"></div>
            <div>
                <span className="block font-bold text-base">
                    {` ${getDisplayUser(conversation).lastName} ${getDisplayUser(conversation).firstName}`}
                </span>
                <span className="text-sm text-white">{conversation.lastMessageSent?.content}</span>
            </div>
        </div>
    );
};
