import React, { FC, useState } from 'react';
import { Dispatch } from 'react';
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
            />

            <section className="my-3">
                <div className="bg-conversation-form py-2 px-4 rounded-[10px] w-full border-box">
                    <label htmlFor="message" className="block text-label-white text-sm">
                        Title (optional)
                    </label>
                    <textarea
                        id="message"
                        className="text-lg w-full border-box p-0 text-white bg-inherit border-0 outline-0 scrollbar-hide overflow-auto resize-none"
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>
            </section>

            <button className=" outline-0 border-0 text-xl bg-blue-button text-white rounded-[10px] py-2 mt-1">
                Create Conversation
            </button>
        </form>
    );
};
