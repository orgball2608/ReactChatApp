import React, { Dispatch, FC, lazy, SetStateAction, Suspense, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { selectType } from '../../store/typeSlice';
import { User } from '../../utils/types';
import { useParams } from 'react-router-dom';
import { EmojiClickData, Theme, EmojiStyle } from 'emoji-picker-react';
import { Cross, FaceHappy, Image } from 'akar-icons';
import { MdLibraryAdd } from 'react-icons/md';
import { AiOutlineSend } from 'react-icons/ai';
import { SpinLoading } from '../commons/SpinLoading';
const EmojiPicker = lazy(() => import('emoji-picker-react'));

type Props = {
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
    sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
    sendTypingStatus: () => void;
    recipient: User | undefined;
    setFileList: Dispatch<SetStateAction<File[]>>;
    fileList: File[];
    isSending: boolean;
};
export const MessageInputField: FC<Props> = ({
    content,
    setContent,
    sendMessage,
    sendTypingStatus,
    recipient,
    setFileList,
    fileList,
    isSending,
}) => {
    const conversationType = useSelector((state: RootState) => selectType(state));
    const { id } = useParams();
    const group = useSelector((state: RootState) => state.group.groups);
    const selectedGroup = group.find((group) => group.id === parseInt(id!));
    const inputRef = useRef(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const onEmojiClick = (emojiObject: EmojiClickData) => {
        const { selectionStart, selectionEnd } = inputRef.current!;
        const newVal = content.slice(0, selectionStart) + emojiObject.emoji + content.slice(selectionEnd);
        setContent(newVal);
    };
    const handleEmojiAction = () => {
        if (showEmojiPicker) setShowEmojiPicker(false);
        else setShowEmojiPicker(true);
    };

    const handleSubmit = () => {
        setShowEmojiPicker(false);
    };

    const handleGetFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        if (fileList.length + [...e.target.files].length > 5) return;
        setFileList((prev) => [...prev, ...[...e.target.files!]]);
    };

    const onDropFile = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!e.dataTransfer.files) return;
        if (e.dataTransfer.files[0].size > 1024 * 1024 * 5) return;
        if (fileList.length + [...e.dataTransfer.files].length > 5) return;
        setFileList((prev) => [...prev, ...[...e.dataTransfer.files]]);
    };

    const onPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
        if (!e.clipboardData) return;
        if (e.clipboardData.files[0].size > 1024 * 1024 * 5) return;
        if (fileList.length + [...e.clipboardData.files].length > 5) return;
        setFileList((prev) => [...prev, ...[...e.clipboardData.files]]);
    };

    return (
        <div className="flex justify-center items-center mt-2 gap-2 px-4">
            {fileList.length === 0 && (
                <label htmlFor="formId" className="flex justify-center items-center">
                    <div className="p-2 hover:bg-[#1c1e21] rounded-full cursor-pointer">
                        <Image size={22} />
                    </div>
                    <input onChange={handleGetFile} name="file" type="file" id="formId" className="hidden" multiple />
                </label>
            )}

            <div
                onKeyDown={handleSubmit}
                className={`w-full box-border bg-message-form pl-3 pr-2 relative flex flex-col items-center gap-1 font-poppins ${
                    fileList.length > 0 ? 'rounded-xl ' : 'rounded-full '
                }`}
            >
                <div className={`mt-2 w-full flex gap-2 ${fileList.length === 0 ? 'hidden ' : ''}`}>
                    {fileList && fileList.length > 0 && (
                        <>
                            <label className="w-12 h-12 bg-[#1c1e21] rounded-md flex justify-center items-center cursor-pointer ">
                                <MdLibraryAdd size={30} />
                                <input
                                    onChange={handleGetFile}
                                    name="file"
                                    type="file"
                                    id="formId"
                                    className="hidden"
                                    multiple
                                />
                            </label>
                            <div className="flex flex-wrap gap-2 justify-start">
                                {fileList.map((file, index) => (
                                    <div key={index} className="flex items-center gap-2 ">
                                        <div className="w-12 h-12 bg-[#1c1e21] rounded-md relative">
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt="attachments"
                                                className="w-12 h-12 rounded-md"
                                            />
                                            <div
                                                onClick={() => setFileList((prev) => prev.filter((f) => f !== file))}
                                                className="p-[1px] bg-white absolute top-0 right-0 rounded-full cursor-pointer "
                                            >
                                                <Cross size={14} className="text-dark-light" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                <div className="relative flex items-center w-full">
                    <form onSubmit={sendMessage} className="w-full">
                        <input
                            type="text"
                            className={`bg-inherit outline-0 border-0 text-[#454545] py-2  font-Inter box-border text-lg  w-full p-0 break-words`}
                            value={content}
                            ref={inputRef}
                            placeholder={`Send message to ${
                                conversationType === 'group'
                                    ? selectedGroup?.title || 'Group'
                                    : recipient?.firstName || 'User'
                            }`}
                            onChange={(e) => setContent(e.target.value)}
                            onKeyDown={sendTypingStatus}
                            onDrop={onDropFile}
                            onPaste={onPaste}
                        />
                    </form>
                    <div className="p-2 hover:bg-[#1c1e21] rounded-full cursor-pointer">
                        <FaceHappy onClick={() => handleEmojiAction()} />
                    </div>

                    {showEmojiPicker && (
                        <div className="absolute right-0 bottom-16">
                            <Suspense
                                fallback={
                                    <div className="w-[348px] h-[357px] flex justify-center items-center">
                                        <SpinLoading />
                                    </div>
                                }
                            >
                                <EmojiPicker
                                    theme={Theme.DARK}
                                    emojiStyle={EmojiStyle.FACEBOOK}
                                    previewConfig={{ showPreview: false }}
                                    lazyLoadEmojis={true}
                                    onEmojiClick={(e) => onEmojiClick(e)}
                                    height={400}
                                    width="360px"
                                />
                            </Suspense>
                        </div>
                    )}
                </div>
            </div>
            {isSending ? (
                <SpinLoading />
            ) : (
                (content.length > 0 || fileList.length > 0) && (
                    <div className="flex justify-center items-center cursor-pointer">
                        <AiOutlineSend size={26} />
                    </div>
                )
            )}
        </div>
    );
};
