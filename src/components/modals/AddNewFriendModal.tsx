import { createRef, Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useDebounce } from '../../hooks/useDebounce';
import { searchUsers } from '../../services/api';
import { AppDispatch } from '../../store';
import { postFriendRequest } from '../../store/friendSlice';
import { User } from '../../utils/types';
import { RecipientSearchField } from '../recipients/RecipientSearchField';

type Props = {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const AddNewFriendModal: FC<Props> = ({ showModal, setShowModal }) => {
    const ref = createRef<HTMLDivElement>();
    const [query, setQuery] = useState('');
    const [userResults, setUserResults] = useState<User[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User>();
    const dispatch = useDispatch<AppDispatch>();

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

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedUser) {
            const { email } = selectedUser;
            dispatch(postFriendRequest({ email }))
                .unwrap()
                .then(() => {
                    setShowModal(false);
                    toast.success('Gửi yêu cầu kết bạn thành công');
                })
                .catch((err) => {
                    console.log(err);
                    toast.error('Không thể gửi yêu cầu kết bạn');
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
                <div className="bg-modal-background w-2/5 box-border rounded-lg">
                    <div className=" box-border flex justify-between mx-6 items-center mt-6">
                        <h1 className="text-2xl font-bold">Add Friend</h1>
                        <MdClose size={24} onClick={() => setShowModal(false)} />
                    </div>
                    <div className="px-6 pb-6 pt-2">
                        <span>Bạn có thể tìm kiếm mọi người và kết bạn với họ.</span>
                        <form onSubmit={onSubmit} className="w-full flex justify-center flex-col relative">
                            <section className="my-3">
                                <RecipientSearchField
                                    selectedUser={selectedUser}
                                    setSelectedUser={setSelectedUser}
                                    setQuery={setQuery}
                                    userResults={userResults}
                                    isSearching={isSearching}
                                    setUserResults={setUserResults}
                                />
                            </section>
                            <div className="flex justify-center">
                                <button
                                    disabled={selectedUser === undefined}
                                    className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded-md ${
                                        selectedUser === undefined && 'opacity-50 cursor-not-allowed'
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
