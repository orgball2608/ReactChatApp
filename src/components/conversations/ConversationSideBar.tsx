import { TbEdit } from 'react-icons/tb';
import { useState } from 'react';
import { CreateConversationModal } from '../modals/CreateConversationModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ConversationSelected } from './ConversationSelected';
import { ConversationSideBarItem } from './ConversationSideBarItem';
import { GroupSideBarItem } from '../groups/GroupSideBarItem';

export const ConversationSidebar = () => {
    const [showModal, setShowModal] = useState(false);
    const conversations = useSelector((state: RootState) => state.conversation.conversations);
    const selectedType = useSelector((state: RootState) => state.type.type);
    const groups = useSelector((state: RootState) => state.group.groups);

    return (
        <>
            {showModal && <CreateConversationModal setShowModal={setShowModal} />}
            <aside className="absolute top-0 left-0 h-full w-80 bg-dark-light border-r-[1px] border-solid border-border-conversations overflow-y-scroll scrollbar-hide overflow-auto">
                <header className="position: fixed top-0 left-0 w-80 flex justify-between items-center px-8 bg-dark-header h-16 border-b-[1px] border-border-conversations">
                    <h1 className="font-normal text-2xl">Conversations</h1>
                    <div onClick={() => setShowModal(!showModal)}>
                        <TbEdit size={28} />
                    </div>
                </header>
                <ConversationSelected />
                <section>
                    {selectedType === 'private'
                        ? conversations.map((conversation) => (
                              <ConversationSideBarItem conversation={conversation} key={conversation.id} />
                          ))
                        : groups.map((group) => <GroupSideBarItem group={group} key={group.id} />)}
                </section>
            </aside>
        </>
    );
};
