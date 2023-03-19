import { ArrowLeft, Search } from 'akar-icons';
import React, { Dispatch, FC } from 'react';
import { User } from '../../utils/types';
import { useCurrentViewportView } from '../../hooks/useCurrentViewportView';

type Props = {
    setIsSearching: Dispatch<React.SetStateAction<boolean>>;
    setQuery: Dispatch<React.SetStateAction<string>>;
    userResults: User[];
    setUserResults: Dispatch<React.SetStateAction<User[]>>;
    query: string;
};

export const ConversationSearchBar: FC<Props> = ({ setIsSearching, setQuery, userResults, setUserResults, query }) => {
    const { isMobile } = useCurrentViewportView();
    const handleSearch = (value: string) => {
        setQuery(value);
    };

    return (
        <div className={`w-60 lg:w-80 flex justify-center items-center h-12 border-r-[1px] border-border-conversations cursor-auto ${isMobile && '!w-full'}`}>
            <div className="w-full relative mx-2 flex justify-start items-center rounded-full bg-[#333335]">
                {(userResults.length > 0 || query !== '') && (
                    <div
                        onClick={() => {
                            setIsSearching(false);
                            setUserResults([]);
                            setQuery('');
                        }}
                        className="p-1 hover:bg-[#1c1e21] rounded-full cursor-pointer pl-2"
                    >
                        <ArrowLeft size={20} />
                    </div>
                )}
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    className={`rounded-full bg-transparent px-4 pl-6 py-[6px] w-full mx-2 outline-0 text-white box-border border-0 text-base ${
                        (userResults.length > 0 || query !== '') && 'pl-0'
                    }`}
                    onChange={(event) => handleSearch(event.target.value)}
                />
                {userResults.length === 0 && query === '' && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                        <Search size={20} />
                    </div>
                )}
            </div>
        </div>
    );
};
