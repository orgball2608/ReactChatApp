import React, { createRef, Dispatch, FC, useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { ModalContainer, ModalContentBody, ModalHeader } from '../index';
import { CreateConversationForm } from '../../forms/CreateConversationForm';
import { ConversationSelectTypeForm } from './ConversationSelectTypeForm';
import { ConversationType, User } from '../../../utils/types';
import { useDebounce } from '../../../hooks/useDebounce';
import { searchUsers } from '../../../services/api';
import { CreateGroupForm } from '../../forms/CreateGroupForm';

type Props = {
    setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

export const CreateConversationModal: FC<Props> = ({ setShowModal }) => {
    const ref = createRef<HTMLDivElement>();
    const [conversationType, setConversationType] = useState<ConversationType>('private');
    const [query, setQuery] = useState('');
    const [userResults, setUserResults] = useState<User[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const debouncedSearchTerm = useDebounce(query, 1000);

    useEffect(() => {
        if (debouncedSearchTerm) {
            setIsSearching(true);
            searchUsers(query)
                .then(({ data }) => {
                    setUserResults(data);
                })
                .catch((err) => console.log(err))
                .finally(() => setIsSearching(false));
        }
    }, [debouncedSearchTerm]);

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => e.key === 'Escape' && setShowModal(false);
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, []);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { current } = ref;
        if (current === e.target) {
            setShowModal(false);
        }
    };
    return (
        <div
            ref={ref}
            className="w-full h-full bg-overlay-background fixed left-0 top-0 flex justify-center items-center z-50 animate-fade-in"
            onClick={handleOverlayClick}
        >
            <ModalContainer>
                <ModalHeader>
                    <span className="text-2xl font-semibold">Create a conversation</span>
                    <div className="p-1 rounded-full bg-[#383636] hover:bg-[#494747]">
                        <MdClose size={20} onClick={() => setShowModal(false)} className="cursor-pointer" />
                    </div>
                </ModalHeader>
                <ConversationSelectTypeForm
                    conversationType={conversationType}
                    setConversationType={setConversationType}
                />
                <ModalContentBody>
                    {conversationType === 'private' ? (
                        <CreateConversationForm
                            setShowModal={setShowModal}
                            setQuery={setQuery}
                            userResults={userResults}
                            setUserResults={setUserResults}
                            isSearching={isSearching}
                        />
                    ) : (
                        <CreateGroupForm
                            setShowModal={setShowModal}
                            setQuery={setQuery}
                            userResults={userResults}
                            setUserResults={setUserResults}
                            isSearching={isSearching}
                            query={query}
                        />
                    )}
                </ModalContentBody>
            </ModalContainer>
        </div>
    );
};
