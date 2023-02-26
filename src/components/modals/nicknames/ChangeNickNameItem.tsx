import { Check, Pencil } from 'akar-icons';
import { Dispatch, FC, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ChangeConversationNickName, ChangeGroupNickName } from '../../../services/api';
import { RootState } from '../../../store';
import { defaultAvatar } from '../../../utils/constants';
import { getDisplayName } from '../../../utils/helpers';
import { Conversation, Group, User } from '../../../utils/types';
import PencilIcon from '../../icons/PenciIcon';

type Props = {
    member: User;
    onSelectMember: (memberId: number) => void;
    isSelected: boolean;
    setSelectedMemberId: Dispatch<SetStateAction<number | null>>;
};

export const ChangeNickNameItem: FC<Props> = ({ member, onSelectMember, isSelected, setSelectedMemberId }) => {
    const [nickname, setNickname] = useState<string>('');
    const conversationType = useSelector((state: RootState) => state.type.type);
    const { id } = useParams<{ id: string }>();
    const conversations = useSelector((state: RootState) => state.conversation.conversations);
    const selectedConversation = conversations.find((conversation: Conversation) => conversation.id === parseInt(id!));
    const groups = useSelector((state: RootState) => state.group.groups);
    const selectedGroup = groups.find((group: Group) => group.id === parseInt(id!));

    const handleItemClick = () => {
        if (getNickname()) {
            setNickname(getNickname()!);
        }
        onSelectMember(member.id);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        submitNickNameChange(nickname);
    };

    const submitNickNameChange = (newNickname: string) => {
        const params = {
            id: parseInt(id!),
            email: member.email,
            nickname: newNickname,
        };
        if (conversationType === 'private') {
            ChangeConversationNickName(params)
                .then(() => {
                    setSelectedMemberId(null);
                })
                .catch((err) => console.log(err));
        } else {
            ChangeGroupNickName(params)
                .then(() => {
                    setSelectedMemberId(null);
                })
                .catch((err) => console.log(err));
        }
    };

    const getNickname = () => {
        if (conversationType === 'private') {
            const nickname = selectedConversation?.nicknames.find((nickname) => nickname.user.id === member?.id);
            if (nickname) return nickname.nickname;
        } else {
            const nickname = selectedGroup?.nicknames.find((nickname) => nickname.user?.id === member?.id);
            if (nickname) return nickname.nickname;
        }
    };

    const getPlaceholder = () => {
        const displayName = getDisplayName(member);
        if (getNickname()) {
            return getNickname();
        }
        return displayName;
    };

    return (
        <div
            className="flex justify-between items-center 
rounded-md w-full p-2 hover:bg-[#1a1a1c]"
        >
            <div
                onClick={() => handleItemClick()}
                className="flex justify-start items-center gap-3 rounded-md w-full hover:bg-[#1a1a1c]"
            >
                <div className="flex flex-none justify-start items-center gap-3">
                    <img src={member?.profile.avatar || defaultAvatar} className="w-10 h-10 rounded-full " />
                </div>
                {isSelected ? (
                    <form onSubmit={handleSubmit} className="w-full flex-grow rounded-md animate-fade-in ">
                        <input
                            value={nickname}
                            onChange={(event) => setNickname(event.target.value)}
                            className="w-full rounded-md px-2 py-1 outline-none bg-[#3d3b3b] border-[1px] border-[#0084FF] text-md hover:bg-[#5c5959]"
                            placeholder={getPlaceholder()}
                        />
                    </form>
                ) : (
                    <div className="flex flex-col justify-between cursor-pointer flex-grow animate-fade-in">
                        {getNickname() && getNickname() !== '' ? (
                            <>
                                <span className="text-base font-normal">{getNickname()}</span>
                                <span className="text-sm font-extralight break-all">
                                    {member && getDisplayName(member)}
                                </span>
                            </>
                        ) : (
                            <>
                                <span className="text-base font-normal">{member && getDisplayName(member)}</span>
                                <span className="text-sm font-extralight break-all">Set Nickname</span>
                            </>
                        )}
                    </div>
                )}
                <div className="p-[6px] flex-none rounded-full hover:bg-[#2f2d2d] cursor-pointer animate-fade-in">
                    {isSelected ? (
                        <button
                            type="submit"
                            className="flex justify-center items-center"
                            onClick={() => submitNickNameChange(nickname)}
                        >
                            <Check strokeWidth={2} size={21} />
                        </button>
                    ) : (
                        <PencilIcon />
                    )}
                </div>
            </div>
        </div>
    );
};
