import { SelectedRecipientChip } from './SelectedRecipientChip';
import { SearchUserModalResults } from '../modals/SearchUserModalResults';
import React, { Dispatch, FC } from 'react';
import { ConversationType, User } from '../../utils/types';

type Props = {
    selectedUser: User | undefined;
    setSelectedUser: Dispatch<React.SetStateAction<User | undefined>>;
    setQuery: Dispatch<React.SetStateAction<string>>;
    userResults: User[];
    isSearching: boolean;
    setUserResults: Dispatch<React.SetStateAction<User[]>>;
    type: ConversationType;
    setSelectedUsers: Dispatch<React.SetStateAction<User[]>>;
    selectedUsers: User[];
    query: string;
};

export const RecipientSearchField: FC<Props> = ({
    selectedUser,
    setSelectedUser,
    userResults,
    setUserResults,
    isSearching,
    setQuery,
    type,
    setSelectedUsers,
    selectedUsers,
    query,
}) => {
    const renderRecipients = () => {
        if (!selectedUser && selectedUsers.length == 0)
            return (
                <input
                    id="email"
                    className="text-lg w-full border-box p-0 text-white bg-inherit border-0 outline-0 scrollbar-hide overflow-auto resize-none"
                    onChange={(event) => setQuery(event.target.value)}
                />
            );

        if (type === 'private' && selectedUser)
            return (
                <SelectedRecipientChip
                    selectedUser={selectedUser}
                    type={type}
                    setSelectedUser={setSelectedUser}
                    setSelectedUsers={setSelectedUsers}
                />
            );

        return (
            <div className="flex flex-wrap">
                {selectedUsers.map((user) => (
                    <SelectedRecipientChip
                        selectedUser={user}
                        type={type}
                        key={user.id}
                        setSelectedUser={setSelectedUser}
                        setSelectedUsers={setSelectedUsers}
                    />
                ))}

                <input
                    id="email"
                    className="text-lg w-full border-box p-0 text-white bg-inherit border-0 outline-0 scrollbar-hide overflow-auto resize-none"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
            </div>
        );
    };

    return (
        <section className="relative">
            <div className="bg-conversation-form py-2 px-4 rounded-[10px] w-full border-box">
                <label htmlFor="email" className="block text-label-white text-sm">
                    Recipient
                </label>
                <div className="flex gap-2 flex-wrap">{renderRecipients()}</div>
            </div>
            <SearchUserModalResults
                userResults={userResults}
                isSearching={isSearching}
                setSelectedUser={setSelectedUser}
                setUserResults={setUserResults}
                setQuery={setQuery}
                setSelectedUsers={setSelectedUsers}
                type={type}
                selectedUsers={selectedUsers}
            ></SearchUserModalResults>
        </section>
    );
};
