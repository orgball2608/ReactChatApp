import React, { Dispatch, FC, useState } from 'react';
import { User } from '../../utils/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';

import { createGroupThunk } from '../../store/groupSlice';
import { GroupRecipientSearchField } from '../recipients/GroupRecipientSearchField';

type Props = {
    setShowModal: Dispatch<React.SetStateAction<boolean>>;
    setQuery: Dispatch<React.SetStateAction<string>>;
    userResults: User[];
    isSearching: boolean;
    setUserResults: Dispatch<React.SetStateAction<User[]>>;
    query: string;
};

export const CreateGroupForm: FC<Props> = ({
    setShowModal,
    setQuery,
    userResults,
    isSearching,
    setUserResults,
    query,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [title, setTitle] = useState<string>('');

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedUsers.length > 0) {
            const users = selectedUsers.map((user) => user.email);
            dispatch(createGroupThunk({ users, title }))
                .unwrap()
                .then(({ data }) => {
                    setShowModal(false);
                    navigate(`/groups/${data.id}`);
                })
                .catch((err) => console.log(err));
        }
    };
    return (
        <form className="w-full flex justify-center flex-col relative" onSubmit={onSubmit}>
            <GroupRecipientSearchField
                setQuery={setQuery}
                userResults={userResults}
                isSearching={isSearching}
                setUserResults={setUserResults}
                setSelectedUsers={setSelectedUsers}
                selectedUsers={selectedUsers}
                query={query}
                title="Members"
            />

            <section className="my-3">
                <div className="bg-conversation-form py-3 px-4 rounded-[10px] w-full border-box">
                    <label htmlFor="message" className="block text-label-white text-sm">
                        Title (optional)
                    </label>
                    <textarea
                        id="message"
                        className="w-full border-box p-0 text-white bg-inherit border-0 outline-0 scrollbar-hide overflow-auto resize-none"
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>
            </section>

            <div className="mt-10 w-full flex justify-end items-center">
                <button
                    className={`outline-0 border-0 bg-[#3366FF] w-40 text-white rounded-lg cursor-pointer py-2 px-4 transform active:scale-125 transition-all duration-300 text-lg font-medium ${
                        selectedUsers.length === 0 && 'opacity-50 pointer-events-none'
                    }`}
                >
                    Create
                </button>
            </div>
        </form>
    );
};
