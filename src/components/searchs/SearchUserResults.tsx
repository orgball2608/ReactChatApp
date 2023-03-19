import { FC } from 'react';
import { User } from '../../utils/types';
import { Loader } from '../commons/Loader';
import { SearchUserResultItem } from './SearchUserResultItem';

type Props = {
    userResults: User[];
    isSearching: boolean;
};

export const SearchUserResults: FC<Props> = ({ userResults, isSearching }) => {
    return (
        <div className="flex flex-col w-full h-full">
            {userResults.length === 0 ? (
                isSearching ? (
                    <Loader />
                ) : (
                    <div className="flex justify-center items-center h-12">
                        <p className="text-[#b1b1b1] text-sm">No results were found</p>
                    </div>
                )
            ) : (
                userResults.map((user) => <SearchUserResultItem user={user} key={user.id} />)
            )}
        </div>
    );
};
