import React, { Dispatch, FC, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contex/AuthContext';
import { AppDispatch, RootState } from '../../store';
import { getFriends } from '../../store/friendSlice';
import { FriendType, User } from '../../utils/types';
import { MemberItemSelect } from './MemberItemSelect';
import { MemberSearchItem } from './MemberSearchItem';

type Props = {
    getRecipient: (friend: FriendType, user: User | undefined) => User | null;
    setSelectedMembers: Dispatch<React.SetStateAction<User[]>>;
    memberChanged: User | undefined;
    selectedMembers: User[];
    isSearching: boolean;
    searchValue: string;
    setUserResults: Dispatch<React.SetStateAction<User[]>>;
    userResults: User[];
};

export const ResultMemberList: FC<Props> = ({
    selectedMembers,
    setSelectedMembers,
    getRecipient,
    memberChanged,
    searchValue,
    userResults,
}) => {
    const friends = useSelector((state: RootState) => state.friends.friends);
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const group = useSelector((state: RootState) => state.group.groups.find((group) => group.id === parseInt(id!)));
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getFriends());
    }, [dispatch]);

    const filterFriend = [...friends!];

    friends &&
        friends.map((friend) => {
            group?.users.map((u) => {
                if (getRecipient(friend, user)?.id === u.id) {
                    filterFriend.splice(
                        filterFriend.findIndex((f) => f.id === friend.id),
                        1,
                    );
                }
            });
        });

    const filterUserResults = [...userResults!];

    userResults &&
        userResults.map((friend) => {
            group?.users.map((u) => {
                if (friend.id === u.id) {
                    filterUserResults.splice(
                        filterUserResults.findIndex((f) => f.id === friend.id),
                        1,
                    );
                }
            });
        });
    return (
        <>
            {!searchValue ? (
                <>
                    <span >Suggest</span>
                    {filterFriend && filterFriend.length === 0 ? (
                        <div className="flex justify-center items-center w-full">
                            <span className="text-sm text-gray-400">No friends available</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-start w-full gap-1">
                            {filterFriend.map((friend) => {
                                return (
                                    <MemberItemSelect
                                        key={friend.id}
                                        friend={friend}
                                        getRecipient={getRecipient}
                                        setSelectedMembers={setSelectedMembers}
                                        memberChanged={memberChanged}
                                        selectedMembers={selectedMembers}
                                    />
                                );
                            })}
                        </div>
                    )}
                </>
            ) : (
                <>
                    <span>Search</span>
                    <div className="flex flex-col items-start w-full gap-1">
                        {filterUserResults && filterUserResults.length === 0 ? (
                            <div className="flex justify-center items-center w-full">
                                <span className="text-sm text-gray-400">No friends available</span>
                            </div>
                        ) : (
                            filterUserResults.map((friend) => {
                                return (
                                    <MemberSearchItem
                                        key={friend.id}
                                        friend={friend}
                                        setSelectedMembers={setSelectedMembers}
                                        memberChanged={memberChanged}
                                        selectedMembers={selectedMembers}
                                    />
                                );
                            })
                        )}
                    </div>
                </>
            )}
        </>
    );
};
