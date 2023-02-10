import React, { Dispatch, FC, SetStateAction, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { selectType } from '../../store/typeSlice';
import { User } from '../../utils/types';
import { useParams } from 'react-router-dom';
import EmojiPicker, { EmojiClickData, Theme, EmojiStyle } from 'emoji-picker-react';
import { FaceHappy } from 'akar-icons';

type Props = {
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
    sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
    sendTypingStatus: () => void;
    recipient: User | undefined;
};
export const MessageInputField: FC<Props> = ({ content, setContent, sendMessage, sendTypingStatus, recipient }) => {
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

    return (
        <div
            onKeyDown={handleSubmit}
            className="w-full box-border bg-message-form rounded-xl pl-8 pr-6 py-1 mt-2 relative flex items-center font-poppins "
        >
            <form onSubmit={sendMessage} className="w-full">
                <input
                    type="text"
                    className="bg-inherit outline-0 border-0 text-[#454545] py-2 font-Inter box-border text-lg  w-full p-0 resize-none break-words "
                    value={content}
                    ref={inputRef}
                    placeholder={`Send message to ${
                        conversationType === 'group' ? selectedGroup?.title || 'Group' : recipient?.firstName || 'User'
                    }`}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={sendTypingStatus}
                />
            </form>
            <div className="p-2 hover:bg-[#1c1e21] rounded-full cursor-pointer">
                <FaceHappy onClick={() => handleEmojiAction()} />
            </div>

            {showEmojiPicker && (
                <div className="absolute right-0 bottom-16">
                    <EmojiPicker
                        theme={Theme.DARK}
                        emojiStyle={EmojiStyle.FACEBOOK}
                        previewConfig={{ showPreview: false }}
                        lazyLoadEmojis={true}
                        onEmojiClick={(e) => onEmojiClick(e)}
                        height={400}
                        width="360px"
                    />
                </div>
            )}
        </div>
    );
};
