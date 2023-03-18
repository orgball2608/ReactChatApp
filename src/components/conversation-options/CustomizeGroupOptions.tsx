import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { ChevronDown, ChevronRight } from 'akar-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { updateGroupAvatar } from '../../store/groupSlice';
import { toast } from 'react-toastify';
import PencilIcon from '../icons/PenciIcon';
import ImageIcon from '../icons/ImageIcon';
import { EmojiSelectModal } from '../modals/EmojiSelectModal';
import LikeIcon from '../icons/LikeIcon';
import { ChangeNickNameModal } from '../modals/nicknames/ChangeNickNameModal';
import ChangeNickNameIcon from '../icons/ChangeNickNameIcon';
import { ChangeThemeModal } from '../modals/ChangeThemeModal';
import { useParams } from 'react-router-dom';

type Props = {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    groupId: number;
};

export const CustomizeGroupOptions: FC<Props> = ({ setShowModal, groupId }) => {
    const { id } = useParams();
    const [showCustomizeConversation, setShowCustomizeConversation] = useState<boolean>(false);
    const [showChangeNickNameModal, setShowChangeNickNameModal] = useState(false);
    const [showChangeEmojiModal, setShowChangeEmojiModal] = useState(false);
    const [showChangeThemeModal, setShowChangeThemeModal] = useState(false);
    const groups = useSelector((state: RootState) => state.group.groups);
    const selectedGroup = groups.find((group) => group.id === parseInt(id!));
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

    const getTheme = () => {
        if (selectedGroup?.theme) return selectedGroup.theme;
        return '#0D90F3';
    };

    return (
        <>
            {showChangeEmojiModal && <EmojiSelectModal setShowModal={setShowChangeEmojiModal} />}
            {showChangeNickNameModal && <ChangeNickNameModal setShowModal={setShowChangeNickNameModal} />}
            {showChangeThemeModal && <ChangeThemeModal setShowModal={setShowChangeThemeModal} />}
            <div className="flex flex-col justify-center ml-2 cursor-pointer font-normal">
                <div
                    onClick={handleShowCustomizeConversation}
                    className="flex items-center justify-between py-2 px-2 hover:bg-[#1c1e21] rounded-md"
                >
                    <span className="text-base text-white font-medium text-[#fcfcfc]">Customize Group</span>
                    <div className="px-1 py-1">
                        {showCustomizeConversation ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </div>
                </div>
                {showCustomizeConversation && (
                    <div className="flex flex-col justify-center overflow-y-scroll scrollbar-hide overflow-auto cursor-pointer">
                        <div
                            onClick={handleShowModal}
                            className="flex justify-start gap-2 items-center rounded-md py-2 px-2 hover:bg-[#1c1e21] "
                        >
                            <div className="p-[2px] rounded-full text-white bg-[#373434]">
                                <PencilIcon className="w-6 h-6" />
                            </div>
                            <span className="text-base">Change group title</span>
                        </div>
                        <div className="rounded-md py-2 px-2 hover:bg-[#1c1e21] ">
                            <label
                                htmlFor="groupAvatar"
                                className="flex justify-start gap-2 items-center cursor-pointer "
                            >
                                <div className="p-[2px] rounded-full text-white bg-[#373434]">
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
                            <div className="p-[6px] rounded-full text-white bg-[#373434]">
                                <LikeIcon className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-base">Change Emoji Icon</span>
                        </div>
                        <div
                            onClick={() => setShowChangeNickNameModal(true)}
                            className="flex justify-start gap-2 items-center rounded-md px-2 py-2 hover:bg-[#1c1e21]"
                        >
                            <div className="p-1 rounded-full text-white bg-[#373434]">
                                <ChangeNickNameIcon className="w-5 h-5 font-bold" />
                            </div>
                            <span className="text-base">Change NickName</span>
                        </div>
                        <div
                            onClick={() => setShowChangeThemeModal(true)}
                            className="flex justify-start gap-2 items-center rounded-md px-2 py-2 hover:bg-[#1c1e21]"
                        >
                            <div className="p-1 rounded-full text-white bg-[#373434] flex justify-center items-center relative">
                                <div className= "w-5 h-5 rounded-full" style={{
                                    backgroundColor: getTheme()
                                }}>
                                </div>
                                <span className='w-2 h-2 rounded-full absolute bg-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                                </span>
                            </div>
                            <span className="text-base">Change theme</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
