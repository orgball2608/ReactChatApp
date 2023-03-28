import { useState } from 'react';
import { CreateConversationModal } from '../modals/conversations/CreateConversationModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ConversationSelected } from '../conversations/ConversationSelected';
import { ConversationSideBarItem } from '../conversations/ConversationSideBarItem';
import { GroupSideBarItem } from '../groups/GroupSideBarItem';
import CreateConversationIcon from '../icons/CreateConversationIcon';
import { useCurrentViewportView } from '../../hooks/useCurrentViewportView';

export const ConversationSidebar = () => {
    const [showModal, setShowModal] = useState(false);
    const conversations = useSelector((state: RootState) => state.conversation.conversations);
    const selectedType = useSelector((state: RootState) => state.type.type);
    const groups = useSelector((state: RootState) => state.group.groups);
    const { isMobile } = useCurrentViewportView();

    return (
        <>
            {showModal && <CreateConversationModal setShowModal={setShowModal} />}
            <aside className={`h-full flex-none bg-dark-gray w-60 lg:w-80 border-solid border-r-[1px] border-border-conversations ${isMobile && '!w-full flex-1'}`}>
                <header className={`absolute top-0 left-16 lg:w-80 w-60 flex flex-col items-start ${isMobile && `!w-full pr-16`}`}>
                    <div className={`flex justify-between px-3 lg:px-4 items-center h-14 lg:w-80 w-60 ${isMobile && '!w-full'}`}>
                        <h1 className="text-2xl font-semibold">Chat</h1>
                        <div
                            className="hover:bg-[#686868] p-[2px] rounded-full flex justify-center items-center bg-[#5a5252] cursor-pointer "
                            onClick={() => setShowModal(true)}
                        >
                            <CreateConversationIcon className="w-7 h-7" color="#ffffff" />
                        </div>
                    </div>
                    <div className={`w-60 lg:w-80 flex flex-col items-start bg-dark-light ${isMobile && `!w-full`}`}>
                        < ConversationSelected/>
                    </div>
                </header>
                <div className="w-full h-full pt-26 overflow-y-auto overflow-auto">
                    <section className="w-full h-full flex flex-col gap-1 cursor-pointer overflow-y-auto overflow-auto">
                        {selectedType === 'private'
                            ? conversations.map((conversation) => (
                                <ConversationSideBarItem conversation={conversation} key={conversation.id} />
                            ))
                            : groups.map((group) => <GroupSideBarItem group={group} key={group.id} />)}
                    </section>
                </div>
            </aside>
        </>
    );
};
