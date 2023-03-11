import { ArrowLeft, Search } from 'akar-icons';
import { Dispatch, FC } from 'react';
import { User } from '../../utils/types';

type Props = {
    setIsSearching: Dispatch<React.SetStateAction<boolean>>;
    setQuery: Dispatch<React.SetStateAction<string>>;
    userResults: User[];
    setUserResults: Dispatch<React.SetStateAction<User[]>>;
    query: string;
};

export const ConversationSearchBar: FC<Props> = ({ setIsSearching, setQuery, userResults, setUserResults, query }) => {
    const handleSearch = (value: string) => {
        setQuery(value);
    };

    return (
        <div className="w-80 flex justify-center items-center h-12 border-r-[1px] border-border-conversations cursor-auto">
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
                    placeholder="Search for Conversations..."
                    value={query}
                    className={`rounded-full bg-transparent px-4 pl-8 py-2 w-full mx-2 outline-0 text-white box-border border-0 text-sm ${
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
