import React, { createRef, Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useDebounce } from '../../hooks/useDebounce';
import { searchUsers } from '../../services/api';
import { AppDispatch } from '../../store';
import { postFriendRequest } from '../../store/friendSlice';
import { User } from '../../utils/types';
import { RecipientSearchField } from '../recipients/RecipientSearchField';
import { useCurrentViewportView } from '../../hooks/useCurrentViewportView';

type Props = {
    setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const AddNewFriendModal: FC<Props> = ({  setShowModal }) => {
    const ref = createRef<HTMLDivElement>();
    const [query, setQuery] = useState('');
    const [userResults, setUserResults] = useState<User[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User>();
    const dispatch = useDispatch<AppDispatch>();
    const { isMobile } = useCurrentViewportView();

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
    }, [setShowModal]);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { current } = ref;
        if (current === e.target) {
            setShowModal(false);
        }
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedUser) {
            const { email } = selectedUser;
            dispatch(postFriendRequest({ email }))
                .unwrap()
                .then(() => {
                    setShowModal(false);
                    toast.success('Send friend request successfully');
                })
                .catch((err) => {
                    console.log(err);
                    toast.error('Send friend request failed');
                });
        }
    };

    return (
        <>
            <div
                onClick={handleOverlayClick}
                ref={ref}
                className="w-full h-full bg-overlay-background fixed left-0 top-0 flex justify-center items-center z-50"
            >
                <div className={`bg-modal-background w-screen max-w-[550px] box-border rounded-lg overflow-hidden h-fit min-w-screen flex flex-col gap-4 animate-fade-in ${isMobile ?'mx-3':''}`}>
                    <div className=" box-border flex justify-center flex-shrink-0 items-center px-4 py-4 border-b-[1px] border-border-conversations ">
                        <div className="mr-auto invisible">
                            <MdClose size={24} className="bg-[#908f8f] cursor-pointer rounded-full" />
                        </div>
                        <span className={`${isMobile ?'text-xl':'text-2xl'}`}>Add Friend</span>
                        <div className="ml-auto bg-[#383636] hover:bg-[#494747] p-1 rounded-full">
                            <MdClose size={20} onClick={() => setShowModal(false)} className="cursor-pointer" />
                        </div>
                    </div>
                    <div className={`pb-6 ${isMobile ?'px-3':'px-6'}`}>
                        <span className="text-sm text-gray-400">You can search for people and make friends with them.</span>
                        <form onSubmit={onSubmit} className="w-full flex justify-center flex-col relative">
                            <section className="mt-2 mb-4">
                                <RecipientSearchField
                                    selectedUser={selectedUser}
                                    setSelectedUser={setSelectedUser}
                                    setQuery={setQuery}
                                    userResults={userResults}
                                    isSearching={isSearching}
                                    setUserResults={setUserResults}
                                    title="User"
                                />
                            </section>
                            <div className="flex justify-center">
                                <button
                                    disabled={selectedUser === undefined}
                                    className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded-lg ${
                                        selectedUser === undefined && 'opacity-75 cursor-not-allowed'
                                    }`}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
