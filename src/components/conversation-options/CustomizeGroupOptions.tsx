import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { ChevronDown, ChevronRight, Image, Pencil } from 'akar-icons';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { updateGroupAvatar } from '../../store/groupSlice';
import { toast } from 'react-toastify';

type Props = {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    groupId: number;
};

export const CustomizeGroupOptions: FC<Props> = ({ setShowModal, groupId }) => {
    const [showCustomizeConversation, setShowCustomizeConversation] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        setShowCustomizeConversation(false);
    }, [groupId]);

    const handleShowCustomizeConversation = () => {
        if (showCustomizeConversation) setShowCustomizeConversation(false);
        else setShowCustomizeConversation(true);
    };
    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleGetFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length === 1) {
            const file = files[0];
            if (file.size > 1024 * 1024 * 5) {
                toast.error('File size must be less than 5MB');
            } else {
                dispatch(
                    updateGroupAvatar({
                        id: groupId,
                        avatar: file,
                    }),
                )
                    .unwrap()
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        toast.error(err.message);
                    });
            }
        }
    };

    return (
        <div className="flex flex-col justify-center ml-2 cursor-pointer">
            <div
                onClick={handleShowCustomizeConversation}
                className="text-lg flex items-center justify-between font-medium py-2 px-2 my-1 hover:bg-[#1c1e21] rounded-md"
            >
                <span>Customize Conversation</span>
                <div className="px-1 py-1">
                    {showCustomizeConversation ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </div>
            </div>
            {showCustomizeConversation && (
                <div className="flex flex-col justify-center gap-2 overflow-y-scroll scrollbar-hide overflow-auto cursor-pointer">
                    <div
                        onClick={handleShowModal}
                        className="flex justify-start gap-2 items-center rounded-md py-2 px-2 hover:bg-[#1c1e21] "
                    >
                        <div className="p-2 rounded-full text-white bg-[#373434]">
                            <Pencil size={18} />
                        </div>
                        <span className="text-lg">Change group title</span>
                    </div>
                    <div className="rounded-md py-2 px-2 hover:bg-[#1c1e21] ">
                        <label htmlFor="formId" className="flex justify-start gap-2 items-center">
                            <div className="p-2 rounded-full text-white bg-[#373434]">
                                <Image size={18} />
                            </div>
                            <span className="text-lg">Change group avatar</span>
                            <input
                                onChange={(e) => handleGetFile(e)}
                                name="file"
                                type="file"
                                id="formId"
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
};
