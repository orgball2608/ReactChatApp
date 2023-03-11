import { SelectedRecipientChip } from './SelectedRecipientChip';
import { SearchRecipientModalResults } from '../modals/SearchRecipientModalResults';
import React, { Dispatch, FC } from 'react';
import { User } from '../../utils/types';

type Props = {
    selectedUser: User | undefined;
    setSelectedUser: Dispatch<React.SetStateAction<User | undefined>>;
    setQuery: Dispatch<React.SetStateAction<string>>;
    userResults: User[];
    isSearching: boolean;
    setUserResults: Dispatch<React.SetStateAction<User[]>>;
    title: string;
};

export const RecipientSearchField: FC<Props> = ({
    selectedUser,
    setSelectedUser,
    userResults,
    setUserResults,
    isSearching,
    setQuery,
    title,
}) => {
    const renderRecipients = () => {
        if (!selectedUser)
            return (
                <input
                    id="text"
                    className="text-sm w-full border-box p-0 text-white bg-inherit border-0 outline-0 scrollbar-hide overflow-auto resize-none"
                    onChange={(event) => setQuery(event.target.value)}
                />
            );

        if (selectedUser)
            return <SelectedRecipientChip selectedUser={selectedUser} setSelectedUser={setSelectedUser} />;
    };

    return (
        <section className="relative">
            <div className="bg-conversation-form py-3 px-4 rounded-[10px] w-full border-box">
                <label htmlFor="text" className="block text-label-white text-xs">
                    {title}
                </label>
                <div className="flex gap-2 flex-wrap">{renderRecipients()}</div>
            </div>
            <SearchRecipientModalResults
                userResults={userResults}
                isSearching={isSearching}
                setSelectedUser={setSelectedUser}
                setUserResults={setUserResults}
                setQuery={setQuery}
            ></SearchRecipientModalResults>
        </section>
    );
};
