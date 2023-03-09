import React, { FC, useState } from 'react';
import { Dispatch } from 'react';
import { User } from '../../utils/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { createConversationThunk } from '../../store/coversationSlice';
import { useNavigate } from 'react-router-dom';
import { RecipientSearchField } from '../recipients/RecipientSearchField';

type Props = {
    setShowModal: Dispatch<React.SetStateAction<boolean>>;
    setQuery: Dispatch<React.SetStateAction<string>>;
    userResults: User[];
    isSearching: boolean;
    setUserResults: Dispatch<React.SetStateAction<User[]>>;
};

export const CreateConversationForm: FC<Props> = ({
    setShowModal,
    setQuery,
    userResults,
    isSearching,
    setUserResults,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [selectedUser, setSelectedUser] = useState<User>();
    const [message, setMessage] = useState<string>('');

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message && selectedUser) {
            dispatch(
                createConversationThunk({
                    email: selectedUser.email,
                    message: message,
                }),
            )
                .unwrap()
                .then(({ data }) => {
                    setShowModal(false);
                    navigate(`/conversations/${data.id}`);
                })
                .catch((err) => console.log(err));
        }
    };
    return (
        <form className="w-full flex justify-center flex-col relative" onSubmit={onSubmit}>
            <RecipientSearchField
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                setQuery={setQuery}
                userResults={userResults}
                isSearching={isSearching}
                setUserResults={setUserResults}
                title={'Recipient'}
            />

            <section className="my-3">
                <div className="bg-conversation-form py-2 px-4 rounded-[10px] w-full border-box">
                    <label htmlFor="message" className="block text-label-white text-sm">
                        Message (optional)
                    </label>

                    <textarea
                        id="message"
                        className="text-lg w-full border-box p-0 text-white bg-inherit border-0 outline-0 scrollbar-hide overflow-auto resize-none"
                        onChange={(event) => setMessage(event.target.value)}
                    />
                </div>
            </section>

            <button
                className={`outline-0 border-0 text-xl bg-blue-button text-white rounded-lg cursor-pointer py-2 mt-1 px-4 transform active:scale-125 transition-all duration-300 ${
                    !selectedUser && 'opacity-50 pointer-events-none'
                }`}
            >
                Create Conversation
            </button>
        </form>
    );
};
