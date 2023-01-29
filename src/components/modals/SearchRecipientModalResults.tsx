import { ConversationType, User } from '../../utils/types';
import React, { Dispatch, FC, useContext } from 'react';
import { AuthContext } from '../../contex/AuthContext';

type Props = {
    userResults: User[];
    isSearching: boolean;
    setSelectedUser: Dispatch<React.SetStateAction<User | undefined>>;
    setUserResults: Dispatch<React.SetStateAction<User[]>>;
    setQuery: Dispatch<React.SetStateAction<string>>;
    setSelectedUsers: Dispatch<React.SetStateAction<User[]>>;
    type: ConversationType;
    selectedUsers: User[];
};
export const SearchRecipientModalResults: FC<Props> = ({
    userResults,
    isSearching,
    setSelectedUser,
    setUserResults,
    setQuery,
    setSelectedUsers,
    type,
    selectedUsers,
}) => {
    const handleSelectedUser = (user: User) => {
        setSelectedUser(user);
        setUserResults([]);
        setQuery('');
    };

    const { user } = useContext(AuthContext);

    const handleMultiSelectedUser = (user: User) => {
        const exists = selectedUsers.find((u) => u.id === user.id);
        if (!exists) setSelectedUsers((prev) => [...prev, user]);
        setUserResults([]);
        setQuery('');
    };

    return (
        <>
            {!isSearching && userResults.length > 0 && (
                <div className="absolute b-0 left-0 bg-[#161616] border-border-conversations border-[1px] h-36 w-full outline-0 rounded-lg transition-colors z-20 overflow-y-scroll">
                    {userResults.map((u) => (
                        <>
                            {u.id !== user?.id && (
                                <div
                                    key={u.id}
                                    className="hover:cursor-pointer hover:bg-[#0c0c0c] box-border px-4 py-1 rounded-lg"
                                    onClick={() =>
                                        type == 'private' ? handleSelectedUser(u) : handleMultiSelectedUser(u)
                                    }
                                >
                                    <span>{u.email}</span>
                                </div>
                            )}
                        </>
                    ))}
                </div>
            )}
        </>
    );
};
