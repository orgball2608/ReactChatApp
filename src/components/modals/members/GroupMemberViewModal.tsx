import { Dispatch, FC, SetStateAction, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { Group } from '../../../utils/types';
import { MemberItem } from './MemberItem';
import { useCurrentViewportView } from '../../../hooks/useCurrentViewportView';

type GroupMemberProps = {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    group: Group | undefined;
};

export const GroupMemberViewModal: FC<GroupMemberProps> = ({ setShowModal, group }) => {
    const [typeMember, setTypeMember] = useState<string>('all');
    const { isMobile } = useCurrentViewportView();
    const getMember = (type: string) => {
        if (type === 'all') return group?.users;
        return new Array(group?.owner);
    };
    return (
        <div
            className="w-full h-full bg-overlay-background fixed left-0 top-0 flex justify-center items-center z-50 animate-fade-in"
            tabIndex={-1}
        >
            <div className={`bg-modal-background w-screen max-w-[500px] box-border rounded-lg overflow-hidden h-96 ${isMobile ?'mx-3':''}`}>
                <div className="box-border flex justify-center flex-shrink-0 items-center p-4">
                    <div className="mr-auto invisible">
                        <MdClose size={24} className="bg-[#908f8f] cursor-pointer rounded-full" />
                    </div>
                    <span className={`${isMobile ?'text-xl':'text-2xl'}`}>Group Member</span>
                    <div className="ml-auto bg-[#383636] hover:bg-[#494747] p-1 rounded-full ">
                        <MdClose size={20} onClick={() => setShowModal(false)} className="cursor-pointer " />
                    </div>
                </div>
                <div className={`flex justify-start items-center h-12 cursor-pointer border-b-[1px] border-border-conversations pb-1 ${isMobile ?'px-2':'px-4'}`}>
                    <div
                        onClick={() => setTypeMember('all')}
                        className={`px-4 rounded-md hover:bg-[#2f2f30] h-full flex items-center  ${
                            typeMember === 'all' && 'border-b-2 border-[#0099ff] rounded-b-none'
                        }  `}
                    >
                        <span className="text-base">All</span>
                    </div>
                    <div
                        onClick={() => setTypeMember('admin')}
                        className={`px-4 rounded-md hover:bg-[#2f2f30] h-full flex items-center  ${
                            typeMember === 'admin' && 'border-b-2 border-[#0099ff] rounded-b-none'
                        }  `}
                    >
                        <span className="text-base">Admin</span>
                    </div>
                </div>
                <div className={`mt-2 flex-grow overflow-y-auto overflow-x-hidden ${isMobile ?'px-2':'px-4'}`}>
                    {getMember(typeMember) &&
                        getMember(typeMember)?.map((user) => <MemberItem user={user} group={group} key={user?.id} />)}
                </div>
            </div>
        </div>
    );
};
