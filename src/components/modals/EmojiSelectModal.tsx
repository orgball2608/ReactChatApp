import { Dispatch, FC, lazy, SetStateAction, Suspense } from 'react';
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ChangeEmojiIcon, ChangeGroupEmojiIcon } from '../../services/api';
import { RootState } from '../../store';
import { SpinLoading } from '../commons/SpinLoading';
const Picker = lazy(() => import('@emoji-mart/react'));

type Props = {
    setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const EmojiSelectModal: FC<Props> = ({ setShowModal }) => {
    const { id } = useParams<{ id: string }>();
    const conversationType = useSelector((state: RootState) => state.type.type);
    const onEmojiClick = (emoji: string) => {
        if (conversationType === 'group') {
            ChangeGroupEmojiIcon({
                emoji: emoji,
                id: parseInt(id!),
            }).then(() => {
                setShowModal(false);
            });
            return;
        }
        ChangeEmojiIcon({
            emoji: emoji,
            id: parseInt(id!),
        }).then(() => {
            setShowModal(false);
        });
    };
    return (
        <div className="w-full h-full bg-overlay-background fixed left-0 top-0 flex justify-center items-center z-50 animate-fade-in ">
            <div className="bg-modal-background w-fit box-border rounded-lg overflow-hidden flex gap-2 flex-col min-w-88 ">
                <div className=" box-border flex justify-center items-center mx-6 mt-6">
                    <div className="mr-auto invisible">
                        <MdClose size={24} className="bg-[#383636] hover:bg-[#494747] cursor-pointer rounded-full" />
                    </div>
                    <span className="text-lg font-medium">Select Emoji</span>
                    <div className="ml-auto bg-[#383636] hover:bg-[#494747] p-1 rounded-full">
                        <MdClose size={20} onClick={() => setShowModal(false)} className="cursor-pointer " />
                    </div>
                </div>
                <div className="w-full">
                    <Suspense
                        fallback={
                            <div className="w-[348px] h-[357px] flex justify-center items-center">
                                <SpinLoading />
                            </div>
                        }
                    >
                        <Picker
                            set="facebook"
                            enableFrequentEmojiSort
                            onEmojiSelect={(e: any) => onEmojiClick(e.native)}
                            theme="dark"
                            showPreview={false}
                            showSkinTones={false}
                            emojiTooltip
                            defaultSkin={1}
                            color="#0F8FF3"
                            navPosition="bottom"
                            locale="vi"
                            previewPosition="none"
                            searchPosition="none"
                        />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};
