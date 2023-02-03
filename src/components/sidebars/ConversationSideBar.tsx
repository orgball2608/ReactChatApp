import { useState } from 'react';
import { CreateConversationModal } from '../modals/CreateConversationModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ConversationSelected } from '../conversations/ConversationSelected';
import { ConversationSideBarItem } from '../conversations/ConversationSideBarItem';
import { GroupSideBarItem } from '../groups/GroupSideBarItem';
import { ConversationSearchBar } from '../conversations/ConversationSearchBar';
import { Edit } from 'akar-icons';

export const ConversationSidebar = () => {
    const [showModal, setShowModal] = useState(false);
    const conversations = useSelector((state: RootState) => state.conversation.conversations);
    const selectedType = useSelector((state: RootState) => state.type.type);
    const groups = useSelector((state: RootState) => state.group.groups);

    return (
        <>
            {showModal && <CreateConversationModal setShowModal={setShowModal} />}
            <aside className="h-full flex-none bg-dark-light w-80 border-solid border-r-[1px] border-border-conversations overflow-y-scroll scrollbar-hide overflow-auto">
                <header className="fixed top-0 left-16 w-80 flex flex-col justify-between items-center px-8 bg-dark-header">
                    <div className="flex justify-between px-4 items-center h-14 w-80 border-b-[1px] border-r-[1px] border-border-conversations">
                        <h1 className="font-normal text-2xl">Conversations</h1>
                        <div
                            className="hover:bg-[#686868] p-[6px] rounded-full flex justify-center items-center bg-[#5a5252] "
                            onClick={() => setShowModal(!showModal)}
                        >
                            <Edit size={24} />
                        </div>
                    </div>
                    <div className="w-80 flex flex-col border-b-[1px] border-border-conversations">
                        <ConversationSelected />
                        <ConversationSearchBar />
                    </div>
                </header>

                <section className="mt-40 w-full">
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
