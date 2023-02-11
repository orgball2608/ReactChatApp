import { Cross, Search } from 'akar-icons';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDebounce } from '../../hooks/useDebounce';
import { addGroupRecipientsAPI, searchUsers } from '../../services/api';
import { FriendType, User } from '../../utils/types';
import defaultAvatar from '../../__assets__/default_avatar.jpg';
import { ResultMemberList } from '../members/ResultMemberList';

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

    const getAvatar = (friend: User) => {
        if (friend.profile) {
            if (friend.profile.avatar) {
                return friend.profile.avatar;
            }
        }
        return defaultAvatar;
    };

    const getDisplayName = (friend: User) => {
        return friend.firstName + ' ' + friend.lastName;
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
        <div className="w-full h-full bg-overlay-background fixed left-0 top-0 flex justify-center items-center z-50">
            <div className="bg-modal-background w-2/5 box-border rounded-lg font-poppins overflow-hidden">
                <div className=" box-border flex justify-center items-center mx-6 mt-6">
                    <div className="mr-auto invisible">
                        <MdClose size={24} className="bg-[#908f8f] cursor-pointer rounded-full" />
                    </div>
                    <h1 className="text-xl font-bold">Add Member</h1>
                    <div className="ml-auto bg-[#908f8f] p-1 rounded-full">
                        <MdClose size={20} onClick={() => setShowModal(false)} className="cursor-pointer " />
                    </div>
                </div>
                <div className="flex justify-center mx-6 mt-4 ">
                    <section className="w-full relative h-fit">
                        <Search
                            size={20}
                            className="text-dark-light font-bold absolute top-1/2 left-2 -translate-y-1/2"
                        />
                        <input
                            type="text"
                            onChange={handleSearchMember}
                            className="w-full rounded-md py-[6px] bg-[#f1ecec] outline-none border-1 border-[#ced0d4] px-2 text-[#121212] text-sm font-poppins font-bold pl-8"
                            placeholder="Search"
                        />
                    </section>
                </div>
                <div className="flex items-start mx-6 gap-4 mt-4 overflow-x-auto h-32">
                    {selectedMembers.length === 0 ? (
                        <div className="flex justify-center items-center w-full h-full">
                            <span className="text-sm">No member selected</span>
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
                                    <div className="w-20 break-words flex justify-center items-center ">
                                        <span className="text-sm">{getDisplayName(member)}</span>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
                <div className="flex flex-col items-start mx-6 gap-2 mt- overflow-y-auto">
                    <ResultMemberList
                        searchValue={searchValue}
                        setSelectedMembers={setSelectedMembers}
                        getRecipient={getRecipient}
                        getAvatar={getAvatar}
                        selectedMembers={selectedMembers}
                        isSearching={isSearching}
                        memberChanged={memberChanged}
                        setUserResults={setUserResults}
                        userResults={userResults}
                    />
                </div>
                <div className="px-6 pb-6 pt-2">
                    <div onClick={handleSubmitMemberAdd} className="flex justify-center">
                        <button
                            className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 w-full rounded-md text-base ${
                                selectedMembers.length === 0 ? 'cursor-not-allowed opacity-30' : ''
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
