import React, { FC, useState } from 'react';
import { Dispatch } from 'react';
import { ConversationType, User } from '../../utils/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { createConversationThunk } from '../../store/coversationSlice';
import { useNavigate } from 'react-router-dom';
import { RecipientSearchField } from '../recipients/RecipientSearchField';
import { createGroupThunk } from '../../store/groupSlice';

type Props = {
    setShowModal: Dispatch<React.SetStateAction<boolean>>;
    setQuery: Dispatch<React.SetStateAction<string>>;
    userResults: User[];
    isSearching: boolean;
    setUserResults: Dispatch<React.SetStateAction<User[]>>;
    type: ConversationType;
    query: string;
};

export const CreateConversationForm: FC<Props> = ({
    setShowModal,
    setQuery,
    userResults,
    isSearching,
    setUserResults,
    type,
    query,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [selectedUser, setSelectedUser] = useState<User>();
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [message, setMessage] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (type === 'private' && selectedUser) {
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
        if (type === 'group' && selectedUsers.length > 0) {
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
            <RecipientSearchField
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                setQuery={setQuery}
                userResults={userResults}
                isSearching={isSearching}
                setUserResults={setUserResults}
                type={type}
                setSelectedUsers={setSelectedUsers}
                selectedUsers={selectedUsers}
                query={query}
            />

            <section className="my-3">
                <div className="bg-conversation-form py-2 px-4 rounded-[10px] w-full border-box">
                    {type === 'private' ? (
                        <label htmlFor="message" className="block text-label-white text-sm">
                            Message (optional)
                        </label>
                    ) : (
                        <label htmlFor="message" className="block text-label-white text-sm">
                            Title (optional)
                        </label>
                    )}
                    <textarea
                        id="message"
                        className="text-lg w-full border-box p-0 text-white bg-inherit border-0 outline-0 scrollbar-hide overflow-auto resize-none"
                        onChange={(event) =>
                            type === 'private' ? setMessage(event.target.value) : setTitle(event.target.value)
                        }
                    />
                </div>
            </section>

            <button className=" outline-0 border-0 text-xl bg-blue-button text-white rounded-[10px] py-2 mt-1">
                Create Conversation
            </button>
        </form>
    );
};
