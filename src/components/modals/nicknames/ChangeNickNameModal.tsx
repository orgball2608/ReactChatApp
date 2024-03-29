import { Dispatch, FC, SetStateAction, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../../store';
import { Conversation, Group } from '../../../utils/types';
import { ChangeNickNameItem } from './ChangeNickNameItem';
import { useCurrentViewportView } from '../../../hooks/useCurrentViewportView';

type Props = {
    setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const ChangeNickNameModal: FC<Props> = ({ setShowModal }) => {
    const { id } = useParams<{ id: string }>();
    const conversationType = useSelector((state: RootState) => state.type.type);
    const conversations = useSelector((state: RootState) => state.conversation.conversations);
    const groups = useSelector((state: RootState) => state.group.groups);
    const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
    const { isMobile } = useCurrentViewportView();
    const selectedGroup = groups.find((group: Group) => group.id === parseInt(id!));
    const selectedConversation = conversations.find((conversation: Conversation) => conversation.id === parseInt(id!));

    const getMember = () => {
        if (conversationType === 'group') {
            return selectedGroup?.users;
        }
        if (selectedConversation) {
            let members = new Array(selectedConversation?.creator);
            if (selectedConversation?.recipient) members.push(selectedConversation?.recipient);
            return members;
        }
        return [];
    };

    const handleSelectMember = (memberId: number) => {
        setSelectedMemberId(memberId);
    };

    return (
        <div
            className="w-full h-full bg-overlay-background fixed left-0 top-0 flex justify-center items-center z-50 animate-fade-in"
            tabIndex={-1}
        >
            <div className={`bg-modal-background w-screen max-w-[550px] box-border rounded-lg overflow-hidden h-fit min-w-screen flex flex-col gap-2 ${isMobile ?'mx-3':''}`}>
                <div className=" box-border flex justify-center flex-shrink-0 items-center p-4 border-b-[1px] border-border-conversations">
                    <div className="mr-auto invisible">
                        <MdClose size={24} className="bg-[#908f8f] cursor-pointer rounded-full" />
                    </div>
                    <span className={`${isMobile ?'text-xl':'text-2xl'}`}>Nickname</span>
                    <div className="ml-auto bg-[#383636] hover:bg-[#494747] p-1 rounded-full ">
                        <MdClose size={20} onClick={() => setShowModal(false)} className="cursor-pointer " />
                    </div>
                </div>
                <div className={`flex flex-col justify-start items-start h-full pb-2 ${isMobile ?'px-1':'px-3'}`}>
                    {getMember()?.map((member) => (
                        <ChangeNickNameItem
                            member={member}
                            key={member.id}
                            isSelected={member.id === selectedMemberId}
                            onSelectMember={handleSelectMember}
                            setSelectedMemberId={setSelectedMemberId}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
