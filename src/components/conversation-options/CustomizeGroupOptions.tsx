import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { ChevronDown, ChevronRight } from 'akar-icons';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { updateGroupAvatar } from '../../store/groupSlice';
import { toast } from 'react-toastify';
import PencilIcon from '../icons/PenciIcon';
import ImageIcon from '../icons/ImageIcon';
import { EmojiSelectModal } from '../modals/EmojiSelectModal';
import LikeIcon from '../icons/LikeIcon';
import { ChangeNickNameModal } from '../modals/nicknames/ChangeNickNameModal';
import ChangeNickNameIcon from '../icons/ChangeNickNameIcon';

type Props = {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    groupId: number;
};

export const CustomizeGroupOptions: FC<Props> = ({ setShowModal, groupId }) => {
    const [showCustomizeConversation, setShowCustomizeConversation] = useState<boolean>(false);
    const [showChangeNickNameModal, setShowChangeNickNameModal] = useState(false);
    const [showChangeEmojiModal, setShowChangeEmojiModal] = useState(false);
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
        <>
            {showChangeEmojiModal && <EmojiSelectModal setShowModal={setShowChangeEmojiModal} />}

            {showChangeNickNameModal && <ChangeNickNameModal setShowModal={setShowChangeNickNameModal} />}
            <div className="flex flex-col justify-center ml-2 cursor-pointer font-poppins">
                <div
                    onClick={handleShowCustomizeConversation}
                    className="flex items-center justify-between py-2 px-2 hover:bg-[#1c1e21] rounded-md"
                >
                    <span className="font-medium text-base text-white">Customize Group</span>
                    <div className="px-1 py-1">
                        {showCustomizeConversation ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </div>
                </div>
                {showCustomizeConversation && (
                    <div className="flex flex-col justify-center overflow-y-scroll scrollbar-hide overflow-auto cursor-pointer">
                        <div
                            onClick={handleShowModal}
                            className="flex justify-start gap-2 items-center rounded-md py-2 px-2 hover:bg-[#1c1e21] "
                        >
                            <div className="p-1 rounded-full text-white bg-[#373434]">
                                <PencilIcon className="w-6 h-6" />
                            </div>
                            <span className="text-base">Change group title</span>
                        </div>
                        <div className="rounded-md py-2 px-2 hover:bg-[#1c1e21] ">
                            <label
                                htmlFor="groupAvatar"
                                className="flex justify-start gap-2 items-center cursor-pointer "
                            >
                                <div className="p-1 rounded-full text-white bg-[#373434]">
                                    <ImageIcon className="w-6 h-6" />
                                </div>
                                <span className="text-base">Change group avatar</span>
                                <input
                                    onChange={(e) => handleGetFile(e)}
                                    name="file"
                                    type="file"
                                    id="groupAvatar"
                                    className="hidden"
                                />
                            </label>
                        </div>
                        <div
                            onClick={() => setShowChangeEmojiModal(true)}
                            className="flex justify-start gap-2 items-center rounded-md px-2 py-2 hover:bg-[#1c1e21]"
                        >
                            <div className="p-2 rounded-full text-white bg-[#373434]">
                                <LikeIcon className="w-4 h-4" />
                            </div>
                            <span className="text-base">Change Emoji Icon</span>
                        </div>
                        <div
                            onClick={() => setShowChangeNickNameModal(true)}
                            className="flex justify-start gap-2 items-center rounded-md px-2 py-2 hover:bg-[#1c1e21]"
                        >
                            <div className="p-1 rounded-full text-white bg-[#373434]">
                                <ChangeNickNameIcon className="w-6 h-6 font-bold" />
                            </div>
                            <span className="text-base">Change NickName</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
