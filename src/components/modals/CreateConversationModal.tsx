import React, { createRef, Dispatch, FC, useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { ModalContainer, ModalContentBody, ModalHeader } from './index';
import { CreateConversationForm } from '../forms/CreateConversationForm';
import { ConversationSelectTypeForm } from './ConversationSelectTypeForm';
import { ConversationType, User } from '../../utils/types';
import { useDebounce } from '../../hooks/useDebounce';
import { searchUsers } from '../../services/api';

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
                    console.log(data);
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
            className="w-full h-full bg-overlay-background fixed flex justify-center items-center z-10"
            onClick={handleOverlayClick}
        >
            <ModalContainer>
                <ModalHeader>
                    <h1 className="text-2xl font-bold ml-2">Create a conversation</h1>
                    <MdClose size={24} onClick={() => setShowModal(false)} />
                </ModalHeader>
                <ConversationSelectTypeForm
                    conversationType={conversationType}
                    setConversationType={setConversationType}
                />
                <ModalContentBody>
                    <CreateConversationForm
                        setShowModal={setShowModal}
                        setQuery={setQuery}
                        userResults={userResults}
                        isSearching={isSearching}
                    />
                </ModalContentBody>
            </ModalContainer>
        </div>
    );
};
