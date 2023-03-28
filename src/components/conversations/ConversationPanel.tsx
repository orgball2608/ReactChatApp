import NoChat from '../commons/NoChat';
import { CreateConversationModal } from '../modals/conversations/CreateConversationModal';
import { useState } from 'react';

export const ConversationPanel = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            {showModal && <CreateConversationModal setShowModal={setShowModal} />}
            <div className="h-full w-full flex flex-col justify-center items-center">
                <NoChat color="#0084ff"/>
                <p className="text-xl">Select a conversation or start a {' '}
                    <span
                        onClick={() => setShowModal(true)}
                        className="text-[#0084ff] hover:underline hover:underline-1 cursor-pointer">new one</span>
                </p>
            </div>
        </>

    );
};
