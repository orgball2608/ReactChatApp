import { FC } from 'react';
import { User } from '../../utils/types';
import { Loader } from '../commons/Loader';
import { SearchUserResultItem } from './SearchUserResultItem';

type Props = {
    userResults: User[];
    isSeaching: boolean;
};

export const SearchUserResults: FC<Props> = ({ userResults, isSeaching }) => {
    return (
        <div className="flex flex-col w-full h-full">
            {userResults.length === 0 ? (
                isSeaching ? (
                    <Loader />
                ) : (
                    <div className="flex justify-center items-center h-12">
                        <p className="text-[#b1b1b1]">No results were found</p>
                    </div>
                )
            ) : (
                userResults.map((user) => <SearchUserResultItem user={user} key={user.id} />)
            )}
        </div>
    );
};
