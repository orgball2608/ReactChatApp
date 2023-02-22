import React, { FC, lazy, Suspense, useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { selectType } from '../../store/typeSlice';
import { Group, GroupMessageType, MessageType, User } from '../../utils/types';
import { useParams } from 'react-router-dom';
import { Cross, Image } from 'akar-icons';
import { AiOutlineSend } from 'react-icons/ai';
import { HiFaceSmile } from 'react-icons/hi2';
import { SpinLoading } from '../commons/SpinLoading';
import {
    CreateReplyGroupMessageAPI,
    CreateReplyMessageAPI,
    postGroupMessage,
    postNewMessage,
} from '../../services/api';
import { SocketContext } from '../../contex/SocketContext';
import { AuthContext } from '../../contex/AuthContext';
import { ImageList } from '../inputs/ImageList';
import { EMOJI_REPLACEMENT } from '../../utils/constants';
import { GrAttachment } from 'react-icons/gr';
import { StickerInput } from '../inputs/StickerInput';
import { GifInput } from '../inputs/GifInput';
import SendMessageIcon from '../icons/SendMessageIcon';
import ImageIcon from '../icons/ImageIcon';
const Picker = lazy(() => import('@emoji-mart/react'));

type Props = {
    recipient: User | undefined;
    setIsRecipientTyping: React.Dispatch<React.SetStateAction<boolean>>;
    replyInfo: MessageType | GroupMessageType | undefined;
    setReplyInfo: React.Dispatch<React.SetStateAction<MessageType | GroupMessageType | undefined>>;
};
export const MessageInputField: FC<Props> = ({ recipient, setIsRecipientTyping, replyInfo, setReplyInfo }) => {
    const conversationType = useSelector((state: RootState) => selectType(state));
    const [content, setContent] = useState('');
    const { id } = useParams();
    const group = useSelector((state: RootState) => state.group.groups);
    const selectedGroup = group.find((group: Group) => group.id === parseInt(id!));
    const conversations = useSelector((state: RootState) => state.conversation.conversations);
    const selectedConversation = conversations.find((conversation) => conversation.id === parseInt(id!));
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

    const onEmojiClick = (emoji: string) => {
        const { selectionStart, selectionEnd, value } = inputRef.current!;
        const newVal = value.slice(0, selectionStart!) + emoji + value.slice(selectionEnd!);
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

        if (!content) return;

        if (replyInfo) {
            if (conversationType === 'private') {
                CreateReplyMessageAPI({
                    id: parseInt(id),
                    content,
                    messageId: replyInfo.id,
                })
                    .then(() => {
                        setReplyInfo(undefined);
                        setIsSending(false);
                        setContent('');
                    })
                    .catch(() => console.log('error'));
            } else {
                CreateReplyGroupMessageAPI({
                    id: parseInt(id),
                    content,
                    messageId: replyInfo.id,
                })
                    .then(() => {
                        setReplyInfo(undefined);
                        setIsSending(false);
                        setContent('');
                    })
                    .catch(() => console.log('error'));
            }

            return;
        }

        data.append('content', content);
        const Id = parseInt(id);
        const params = { id: Id, data };
        setContent('');
        setFileList([]);
        if (conversationType === 'private')
            postNewMessage(params)
                .then(() => {})
                .catch((err) => console.log(err));
        else
            postGroupMessage(params)
                .then(() => {})
                .catch((err) => console.log(err));
    };

    const handleReplaceEmoji = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === ' ' || e.key === 'Enter') {
            const lastWord = content.split(' ').pop();
            if (lastWord?.length === 0) return;
            Object.entries(EMOJI_REPLACEMENT).map(([key, value]) => {
                value.forEach((emoji) => {
                    if (emoji === lastWord) {
                        const splitted = content.split('');
                        splitted.splice(inputRef.current?.selectionStart! - lastWord.length, lastWord.length, key);
                        setContent(splitted.join(''));
                        inputRef.current!.value = splitted.join('');
                    }
                });
            });
        }
    };

    const getEmoji = () => {
        if (conversationType === 'private' && selectedConversation && selectedConversation.emoji !== null) {
            return selectedConversation.emoji;
        } else if (conversationType === 'group' && selectedGroup && selectedGroup.emoji !== null) {
            return selectedGroup.emoji;
        } else {
            return '👍🏽';
        }
    };

    const onSendEmojiMessage = (emoji: string) => {
        if (!id) return;
        const data = new FormData();
        data.append('content', emoji);
        const Id = parseInt(id);
        const params = { id: Id, data };
        if (conversationType === 'private')
            postNewMessage(params)
                .then(() => {})
                .catch((err) => console.log(err));
        else
            postGroupMessage(params)
                .then(() => {})
                .catch((err) => console.log(err));
    };

    return (
        <div className="w-full h-full">
            {replyInfo && (
                <div className=" relative h-12 border-t border-[#2f3237] px-6 flex justify-between items-center py-auto">
                    <div className="flex flex-col justify-center items-start">
                        <p>
                            Replying to
                            {replyInfo?.author.id === user?.id ? (
                                ' yourself'
                            ) : (
                                <span className="font-semibold">{` ${replyInfo?.author.lastName}`}</span>
                            )}
                        </p>
                        {replyInfo?.content ? (
                            <p className="overflow-hidden whitespace-nowrap text-ellipsis max-w-[calc(100vw-65px)] md:max-w-[calc(100vw-420px)]">
                                {replyInfo?.content}
                            </p>
                        ) : replyInfo?.attachments?.length > 0 ? (
                            <p>
                                {replyInfo?.attachments?.length} {replyInfo?.attachments?.length > 1 ? 'files' : 'file'}
                            </p>
                        ) : replyInfo?.gif ? (
                            <p>GIF</p>
                        ) : replyInfo?.sticker ? (
                            <p>Sticker</p>
                        ) : null}
                    </div>
                    <button
                        className="p-2 rounded-full hover:bg-[#1c1e21] absolute right-2 top-0"
                        onClick={() => setReplyInfo && setReplyInfo(undefined)}
                    >
                        <Cross size={14} />
                    </button>
                </div>
            )}

            <div className="flex justify-center items-center mt-2 gap-1 px-4">
                {fileList.length === 0 && (
                    <>
                        <label htmlFor="formId" className="flex justify-center items-center animate-fade-in">
                            <div className="p-1 hover:bg-[#1c1e21] rounded-full cursor-pointer text-primary">
                                <ImageIcon className="w-7 h-7" />
                            </div>
                            <input
                                onChange={handleGetFile}
                                name="file"
                                type="file"
                                id="formId"
                                className="hidden"
                                multiple
                            />
                        </label>
                        {content.length === 0 && (
                            <div className="flex gap-1 justify-center items-center cursor-pointer relative animate-fade-in">
                                <GrAttachment size={20} className="text-primary hover:bg-[#1c1e21] rounded-full" />
                                <StickerInput />
                                <GifInput />
                            </div>
                        )}
                    </>
                )}

                <div
                    onKeyDown={handleSubmit}
                    className={`w-full box-border bg-message-form pl-3 relative flex flex-col items-center gap-1 font-poppins ${
                        fileList.length > 0 ? 'rounded-xl ' : 'rounded-full '
                    }`}
                >
                    <div className={`mt-2 w-full flex gap-2 ${fileList.length === 0 ? 'hidden ' : ''}`}>
                        {fileList && fileList.length > 0 && (
                            <ImageList fileList={fileList} setFileList={setFileList} handleGetFile={handleGetFile} />
                        )}
                    </div>
                    <div className="relative flex items-center justify-between w-full">
                        <form onSubmit={sendMessage} className="w-full">
                            <input
                                type="text"
                                className={`bg-inherit outline-0 border-0 text-[#454545] py-1  font-Inter box-border text-lg  w-full p-0 break-words`}
                                ref={inputRef}
                                placeholder={`Send message to ${
                                    conversationType === 'group'
                                        ? selectedGroup?.title || 'Group'
                                        : recipient?.firstName || 'User'
                                }`}
                                onKeyDown={(e) => {
                                    handleReplaceEmoji(e);
                                    sendTypingStatus();
                                }}
                                onDrop={onDropFile}
                                onPaste={onPaste}
                            />
                        </form>
                        <div
                            onClick={() => handleEmojiAction()}
                            className="p-2 hover:bg-[#1c1e21] rounded-full cursor-pointer "
                        >
                            <HiFaceSmile size={20} className=" text-primary rounded-full" />
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
                                    />
                                </Suspense>
                            </div>
                        )}
                    </div>
                </div>
                {isSending ? (
                    <SpinLoading />
                ) : content.length > 0 || fileList.length > 0 ? (
                    <div className="flex justify-center items-center cursor-pointer animate-fade-in hover:bg-[#1c1e21] rounded-full p-1">
                        <SendMessageIcon className="text-primary" color="#0084ff" />
                    </div>
                ) : (
                    <div
                        onClick={() => onSendEmojiMessage(getEmoji())}
                        className=" flex-none w-fit h-fit rounded-full p-1 hover:bg-[#1c1e21] cursor-pointer"
                    >
                        <button className="text-xl w-6 h-6 text-center">{getEmoji()}</button>
                    </div>
                )}
            </div>
        </div>
    );
};
