import { User } from '../../utils/types';
import { FC } from 'react';

type Props = {
    userResults: User[];
    isSearching: boolean;
};
export const SearchUserModalResults: FC<Props> = ({ userResults, isSearching }) => {
    return (
        <>
            {!isSearching && userResults.length > 0 && (
                <div className="absolute b-0 left-0 bg-[#161616] border-border-conversations border-[1px] h-fit w-full outline-0 rounded-lg transition-colors z-20">
                    {userResults.map((user) => (
                        <div
                            key={user.id}
                            className="hover:cursor-pointer hover:bg-[#0c0c0c] box-border px-4 py-1 rounded-lg border-[1px]  border-border-conversations"
                        >
                            <span>{user.email}</span>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};
