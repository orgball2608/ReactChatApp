import { TbEdit } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { FC, useContext, useState } from 'react';
import { ConversationType } from '../../utils/types';
import { CreateConversationModal } from '../modals/CreateConversationModal';
import { AuthContext } from '../../contex/AuthContext';

type Props = {
    conversations: ConversationType[];
};
export const ConversationSidebar: FC<Props> = ({ conversations }) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);

    console.log(conversations);
    console.log(user);

    const getDisplayUser = (conversation: ConversationType) => {
        return conversation.creator.id === user?.id ? conversation.recipient : conversation.creator;
    };

    return (
        <>
            {showModal && <CreateConversationModal setShowModal={setShowModal} />}
            <aside className="absolute top-0 left-0 h-full w-80 bg-dark-light border-r-[1px] border-solid border-border-conversations overflow-y-scroll scrollbar-hide overflow-auto">
                <header className="position: fixed top-0 left-0 w-80 flex justify-between items-center px-8 bg-dark-header h-16 border-b-[1px] border-border-conversations">
                    <h1 className="font-normal text-lg">Conversations</h1>
                    <div onClick={() => setShowModal(!showModal)}>
                        <TbEdit size={28} />
                    </div>
                </header>
                <div className="mt-16">
                    {conversations.map((conversation) => (
                        <div
                            className={
                                'flex justify-start items-center gap-5 px-8 py-3 box-border border-b-[1px] border-solid border-border-conversations bg-simple-gray'
                            }
                            onClick={() => {
                                navigate(`/conversations/${conversation.id}`);
                            }}
                            key={conversation.id}
                        >
                            <div className="bg-white h-12 w-12 rounded-full bg-blue-500"></div>
                            <div>
                                <span className="block font-bold text-base">
                                    {`${getDisplayUser(conversation).firstName} ${
                                        getDisplayUser(conversation).lastName
                                    }`}
                                </span>
                                <span className="text-sm text-white">Last message</span>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>
        </>
    );
};
