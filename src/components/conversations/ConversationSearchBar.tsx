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
            <div className="w-full relative mx-2 flex justify-start items-center">
                {(userResults.length > 0 || query !== '') && (
                    <div
                        onClick={() => {
                            setIsSearching(false);
                            setUserResults([]);
                            setQuery('');
                        }}
                        className="p-1 hover:bg-[#1c1e21] rounded-full cursor-pointer "
                    >
                        <ArrowLeft size={20} />
                    </div>
                )}
                <input
                    type="text"
                    placeholder="Search for Conversations..."
                    value={query}
                    className={`rounded-2xl px-4 pl-8 py-1 bg-[#202020] w-full mx-2 outline-0 text-[#6b6b6b] box-border border-0 text-md ${
                        (userResults.length > 0 || query !== '') && 'pl-4'
                    }`}
                    onChange={(event) => handleSearch(event.target.value)}
                />
                {userResults.length === 0 && query === '' && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <Search size={20} />
                    </div>
                )}
            </div>
        </div>
    );
};
