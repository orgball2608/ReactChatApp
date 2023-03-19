import { Cross, Search } from 'akar-icons';
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDebounce } from '../../../hooks/useDebounce';
import { addGroupRecipientsAPI, searchUsers } from '../../../services/api';
import { FriendType, User } from '../../../utils/types';
import { ResultMemberList } from '../../members/ResultMemberList';
import { getAvatar, getDisplayName } from '../../../utils/helpers';
import { useCurrentViewportView } from '../../../hooks/useCurrentViewportView';

type Props = {
    setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const GroupAddMemberModal: FC<Props> = ({ setShowModal }) => {
    const { id } = useParams();
    const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [memberChanged, setMemberChanged] = useState<User>();
    const [userResults, setUserResults] = useState<User[]>([]);
    const { isMobile } = useCurrentViewportView();

    useEffect(() => {
        if (memberChanged) {
            setMemberChanged(undefined);
        }
    }, [selectedMembers]);

    const debouncedSearchTerm = useDebounce(searchValue, 1000);

    useEffect(() => {
        if (debouncedSearchTerm) {
            setIsSearching(true);
            searchUsers(searchValue)
                .then(({ data }) => {
                    setUserResults(data);
                })
                .catch((err) => console.log(err))
                .finally(() => setIsSearching(false));
        }
    }, [debouncedSearchTerm]);

    const getRecipient = (friend: FriendType, user: User | undefined) => {
        if (!user) return null;
        return friend.receiver.id === user.id ? friend.sender : friend.receiver;
    };

    const handleRemoveSelectedMember = (member: User) => {
        setSelectedMembers((prev) => prev.filter((m) => m.id !== member.id));
        setMemberChanged(member);
    };

    const handleSearchMember = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        if (e.target.value === '') setIsSearching(false);
        else setIsSearching(true);
    };

    const handleSubmitMemberAdd = () => {
        const emails = selectedMembers.map((member) => member.email);
        addGroupRecipientsAPI({
            groupId: parseInt(id!),
            emails: emails,
        })
            .then(() => {
                toast.success('Add member successfully');
                setShowModal(false);
            })
            .catch((err) => {
                setShowModal(false);
                console.log(err);
            });
    };

    return (
        <div className="w-full h-full bg-overlay-background fixed left-0 top-0 flex justify-center items-center z-50 ">
            <div className={`bg-modal-background w-screen max-w-[550px] box-border rounded-lg overflow-hidden animate-fade-in ${isMobile ?'mx-3':''}`}>
                <div className="box-border flex justify-center flex-shrink-0 items-center px-4 py-3 border-b-[1px] border-border-conversations ">
                    <div className="mr-auto invisible">
                        <MdClose size={24} className="bg-[#383636] hover:bg-[#494747] cursor-pointer rounded-full" />
                    </div>
                    <h1 className={`${isMobile ?'text-xl':'text-2xl'}`}>Add Member</h1>
                    <div className="ml-auto bg-[#383636] hover:bg-[#494747] p-1 rounded-full">
                        <MdClose size={20} onClick={() => setShowModal(false)} className="cursor-pointer " />
                    </div>
                </div>
                <div className={`flex justify-center mt-4 ${isMobile ?'px-2':'px-6'}`}>
                    <section className="w-full relative h-fit">
                        <Search
                            size={20}
                            className="text-dark-light font-bold absolute top-1/2 left-2 -translate-y-1/2"
                        />
                        <input
                            type="text"
                            onChange={handleSearchMember}
                            className="w-full rounded-md py-1 bg-dark-lighten text-white outline-none border-1 border-[#ced0d4] px-2 text-base pl-8"
                            placeholder="Search"
                        />
                    </section>
                </div>
                <div className={`flex items-start gap-4 mt-4 overflow-x-auto h-28 ${isMobile ?'px-2':'px-6'}`}>
                    {selectedMembers.length === 0 ? (
                        <div className="flex justify-center items-center w-full h-full">
                            <span className="text-sm text-gray-400">No member selected</span>
                        </div>
                    ) : (
                        selectedMembers.map((member) => {
                            return (
                                <div key={member.id} className="flex flex-col justify-center items-center gap-1">
                                    <div
                                        onClick={() => handleRemoveSelectedMember(member)}
                                        className="flex flex-col items-center justify-center w-16 h-16 relative"
                                    >
                                        <img src={getAvatar(member)} alt="avatar" className="w-16 h-16 rounded-full" />
                                        <div className="absolute top-0 right-0 w-5 h-5 bg-[#f1ecec] rounded-full flex justify-center items-center cursor-pointer">
                                            <Cross size={14} className="text-[#121212]" />
                                        </div>
                                    </div>
                                    <div className="w-20 break-words overflow-hidden text-ellipsis whitespace-nowrap">
                                        <span className="text-sm">{getDisplayName(member)}</span>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
                <div className={`flex flex-col items-start gap-2 mt- overflow-y-auto ${isMobile ?'px-2':'px-6'}`}>
                    <ResultMemberList
                        searchValue={searchValue}
                        setSelectedMembers={setSelectedMembers}
                        getRecipient={getRecipient}
                        selectedMembers={selectedMembers}
                        isSearching={isSearching}
                        memberChanged={memberChanged}
                        setUserResults={setUserResults}
                        userResults={userResults}
                    />
                </div>
                <div className={`pb-6 pt-2 ${isMobile ?'px-2':'px-6'}`}>
                    <div onClick={handleSubmitMemberAdd} className="flex justify-center">
                        <button
                            className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-[6px] w-full rounded-md text-base ${
                                selectedMembers.length === 0 ? 'cursor-not-allowed opacity-70' : ''
                            }`}
                        >
                            Add Member
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
