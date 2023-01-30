import React, { Dispatch, FC } from 'react';
import { User } from '../../utils/types';
import { SelectedGroupRecipientChip } from './SelectedGroupRecipientChip';
import { SearchGroupRecipientModalResults } from '../modals/SearchGroupRecipientModalResults';

type Props = {
    setQuery: Dispatch<React.SetStateAction<string>>;
    userResults: User[];
    isSearching: boolean;
    setUserResults: Dispatch<React.SetStateAction<User[]>>;
    setSelectedUsers: Dispatch<React.SetStateAction<User[]>>;
    selectedUsers: User[];
    query: string;
};

export const GroupRecipientSearchField: FC<Props> = ({
    userResults,
    setUserResults,
    isSearching,
    setQuery,
    setSelectedUsers,
    selectedUsers,
    query,
}) => {
    const renderRecipients = () => {
        if (selectedUsers && selectedUsers.length === 0)
            return (
                <input
                    id="email"
                    className="text-lg w-full border-box p-0 text-white bg-inherit border-0 outline-0 scrollbar-hide overflow-auto resize-none"
                    onChange={(event) => setQuery(event.target.value)}
                />
            );

        return (
            <div className="flex flex-wrap">
                {selectedUsers.map((user) => (
                    <SelectedGroupRecipientChip key={user.id} selectedUser={user} setSelectedUsers={setSelectedUsers} />
                ))}

                <input
                    id="email"
                    className="text-lg w-full border-box p-0 text-white bg-inherit border-0 outline-0 scrollbar-hide overflow-auto resize-none"
                    value={query}
                    onChange={(event) => {
                        setQuery(event.target.value);
                    }}
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
            <SearchGroupRecipientModalResults
                userResults={userResults}
                isSearching={isSearching}
                setUserResults={setUserResults}
                setQuery={setQuery}
                setSelectedUsers={setSelectedUsers}
                selectedUsers={selectedUsers}
            ></SearchGroupRecipientModalResults>
        </section>
    );
};
