import React, { FC, lazy, Suspense, useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { selectType } from '../../store/typeSlice';
import { User } from '../../utils/types';
import { useParams } from 'react-router-dom';
import { EmojiClickData, Theme, EmojiStyle } from 'emoji-picker-react';
import { FaceHappy, Image } from 'akar-icons';
import { AiOutlineSend } from 'react-icons/ai';
import { SpinLoading } from '../commons/SpinLoading';
import { postGroupMessage, postNewMessage } from '../../services/api';
import { SocketContext } from '../../contex/SocketContext';
import { AuthContext } from '../../contex/AuthContext';
import { ImageList } from '../inputs/ImageList';
const EmojiPicker = lazy(() => import('emoji-picker-react'));

type Props = {
    recipient: User | undefined;
    setIsRecipientTyping: React.Dispatch<React.SetStateAction<boolean>>;
};
export const MessageInputField: FC<Props> = ({ recipient, setIsRecipientTyping }) => {
    const conversationType = useSelector((state: RootState) => selectType(state));
    const [content, setContent] = useState('');
    const { id } = useParams();
    const group = useSelector((state: RootState) => state.group.groups);
    const selectedGroup = group.find((group) => group.id === parseInt(id!));
    const inputRef = useRef<HTMLInputElement>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [fileList, setFileList] = useState<File[]>([]);
    const [isSending, setIsSending] = useState(false);
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
    const [isTyping, setIsTyping] = useState(false);

    const socket = useContext(SocketContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        setIsRecipientTyping(false);
    }, [id]);

    useEffect(() => {
        const onChanged = () => {
            const { value } = inputRef.current!;
            setContent(value);
        };
        document.addEventListener('input', onChanged);
        return () => {
            document.removeEventListener('input', onChanged);
        };
    }, []);

    useEffect(() => {
        socket.on('onTypingStart', () => {
            setIsRecipientTyping(true);
        });

        socket.on('onTypingStop', () => {
            setIsRecipientTyping(false);
        });

        return () => {
            socket.off('onTypingStart');
            socket.off('onTypingStop');
        };
    }, [id]);

    const sendTypingStatus = () => {
        if (isTyping) {
            clearTimeout(timer);
            setTimer(
                setTimeout(() => {
                    socket.emit('onTypingStop', { conversationId: id, userId: user?.id });
                    setIsTyping(false);
                }, 4000),
            );
        } else {
            setIsTyping(true);
            socket.emit('onTypingStart', { conversationId: id, userId: user?.id });
        }
    };

    const onEmojiClick = (emojiObject: EmojiClickData) => {
        const { selectionStart, selectionEnd, value } = inputRef.current!;
        const newVal = value.slice(0, selectionStart!) + emojiObject.emoji + value.slice(selectionEnd!);
        inputRef.current!.value = newVal;
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

    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        inputRef.current!.value = '';
        if (!id || (!fileList && !content)) return;
        const data = new FormData();

        fileList.forEach((file) => {
            data.append('attachments', file);
        });

        // If there is content and attachments, send the content first, then send the attachments
        if (content.length > 0 && fileList.length > 0) {
            const contentData = new FormData();
            contentData.append('content', content);
            setIsSending(true);
            setContent('');
            setFileList([]);
            if (conversationType === 'private')
                await postNewMessage({ id: parseInt(id), data: contentData }).then(() => {
                    postNewMessage({ id: parseInt(id), data }).then(() => {
                        setIsSending(false);
                    });
                });
            else
                await postGroupMessage({ id: parseInt(id), data: contentData }).then(() => {
                    postGroupMessage({ id: parseInt(id), data }).then(() => {
                        setIsSending(false);
                    });
                });

            return;
        }

        data.append('content', content);
        const Id = parseInt(id);
        const params = { id: Id, data };
        setIsSending(true);
        setContent('');
        setFileList([]);
        if (conversationType === 'private')
            postNewMessage(params)
                .then(() => {
                    setIsSending(false);
                })
                .catch((err) => console.log(err));
        else
            postGroupMessage(params)
                .then(() => {
                    setIsSending(false);
                })
                .catch((err) => console.log(err));
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
                        <ImageList fileList={fileList} setFileList={setFileList} handleGetFile={handleGetFile} />
                    )}
                </div>
                <div className="relative flex items-center w-full">
                    <form onSubmit={sendMessage} className="w-full">
                        <input
                            type="text"
                            className={`bg-inherit outline-0 border-0 text-[#454545] py-2  font-Inter box-border text-lg  w-full p-0 break-words`}
                            ref={inputRef}
                            placeholder={`Send message to ${
                                conversationType === 'group'
                                    ? selectedGroup?.title || 'Group'
                                    : recipient?.firstName || 'User'
                            }`}
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
