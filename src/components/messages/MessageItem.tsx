import React, { Dispatch, FC, useContext, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AuthContext } from '../../contex/AuthContext';
import { MessageMenuContext } from '../../contex/MessageMenuContext';
import { formatDate } from '../../utils/helpers';
import { GroupMessageType, MessageType } from '../../utils/types';
import { AttachmentListRender } from '../attachments/AttachmentListRender';
import SpriteRenderer from '../inputs/SpriteRenderer';
import { ReactionStatusModal } from '../modals/ReactionStatusModal';
import { MessageReaction } from '../reactions/MessageReaction';
import ReactionStatus from '../reactions/ReactionStatus';
import { DeletedMessage } from './DeletedMessage';
import { EditMessageContainer } from './EditMessageContainer';
import { MessageFileRender } from './MessageFileRender';
import { MessageOption } from './MessageOption';
import { MessageReplyBadge } from './MessageReplyBadge';
import { MessageReplyIcon } from './MessageReplyIcon';

type Props = {
    m: MessageType | GroupMessageType;
    currentMessage: MessageType | GroupMessageType;
    prevMessage: MessageType | GroupMessageType;
    index: number;
    isEditing: boolean;
    setIsEditing: Dispatch<React.SetStateAction<boolean>>;
    onEditMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setReplyInfo: React.Dispatch<React.SetStateAction<MessageType | GroupMessageType | undefined>>;
};

export const MessageItem: FC<Props> = ({
    m,
    currentMessage,
    prevMessage,
    index,
    isEditing,
    setIsEditing,
    onEditMessageChange,
    setReplyInfo,
}) => {
    const { user } = useContext(AuthContext);
    const { editMessage } = useContext(MessageMenuContext);
    const [showReactionStatusModal, setShowReactionStatusModal] = useState<boolean>(false);
    const isAuthor = user?.id === m.author.id;
    return (
        <>
            {showReactionStatusModal && <ReactionStatusModal message={m} setShowModal={setShowReactionStatusModal} />}
            <div
                key={m.id}
                className={`flex flex-col justify-end  ${
                    m.content && m.attachments?.length === 0 && m.gif ? ' gap-0 ' : 'gap-1 '
                }`}
            >
                {m.deletedAt ? (
                    <div
                        className={`flex gap-4 items-center w-5/6 group ${
                            isAuthor ? 'place-self-end justify-end' : 'place-self-start justify-start'
                        }`}
                    >
                        <div
                            className={`p-0 text-base flex justify-start items-center w-fit gap-2 cursor-pointer ${
                                isAuthor ? 'flex-row-reverse' : ''
                            }`}
                        >
                            <div
                                id={'message-' + m.id}
                                title={formatDate(m.createdAt)}
                                className={`p-0 relative text-base flex justify-start items-center w-fit cursor-pointer ${
                                    isAuthor ? 'flex-row-reverse' : 'pl-10'
                                } ${m.reacts?.length > 0 ? 'mb-2' : ''}`}
                            >
                                <DeletedMessage />
                            </div>
                        </div>
                    </div>
                ) : m.content ? (
                    <div
                        className={`flex gap-4 items-center break-all w-5/6 group ${
                            isAuthor ? 'place-self-end justify-end' : 'place-self-start justify-start'
                        }`}
                        key={m.id}
                    >
                        {isEditing && m.id === editMessage?.id ? (
                            <div className="p-0 pl-10 text-base flex justify-start items-center w-full mt-2">
                                <EditMessageContainer
                                    onEditMessageChange={onEditMessageChange}
                                    editMessage={editMessage}
                                    setIsEditing={setIsEditing}
                                />
                            </div>
                        ) : (
                            <div
                                className={`p-0 pl-10 text-base flex flex-col  w-fit ${
                                    isAuthor ? 'flex-row-reverse' : ''
                                }   `}
                            >
                                {m.reply && (
                                    <div
                                        className={`-mb-2 w-full flex items-center justify-start ${
                                            isAuthor ? 'flex-row-reverse' : ''
                                        } `}
                                    >
                                        <MessageReplyBadge message={m.reply} />
                                    </div>
                                )}
                                <div
                                    className={`flex gap-2 justify-start items-center ${
                                        isAuthor ? 'flex-row-reverse' : ''
                                    } `}
                                >
                                    <div
                                        id={'message-' + m.id}
                                        title={formatDate(m.createdAt)}
                                        className={`relative w-fit rounded-xxl  ${
                                            m.reacts?.length > 0 ? 'mb-2' : ''
                                        } ${
                                            (currentMessage.author.id !== prevMessage?.author.id && index !== 0) ||
                                            index === 0
                                                ? `${
                                                      isAuthor
                                                          ? `${
                                                                m.attachments?.length === 0
                                                                    ? 'rounded-tr bg-primary'
                                                                    : 'rounded-r bg-primary '
                                                            }`
                                                          : `${
                                                                m.attachments?.length === 0
                                                                    ? 'rounded-tl bg-dark-lighten '
                                                                    : 'rounded-l  bg-dark-lighten'
                                                            }`
                                                  }`
                                                : `${isAuthor ? 'rounded-r bg-primary' : 'rounded-l bg-dark-lighten '}`
                                        } py-2 px-3 text-base`}
                                    > 
                                        <p>{m.content}</p>

                                        {m.reacts?.length > 0 && (
                                            <ReactionStatus message={m} setShowModal={setShowReactionStatusModal} />
                                        )}
                                    </div>
                                    <div
                                        className={`invisible group-hover:visible flex ${
                                            isAuthor ? 'flex-row-reverse' : ''
                                        } `}
                                    >
                                        <MessageReaction message={m} />
                                        <MessageReplyIcon setReplyInfo={setReplyInfo} message={m} />
                                        <MessageOption message={m} setIsEditing={setIsEditing} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    // if message has attachments
                    (m.attachments?.length > 0 || m.gif || m.sticker) && (
                        <div
                            className={`flex gap-4 items-center w-5/6 group ${
                                isAuthor ? 'place-self-end justify-end' : 'place-self-start justify-start'
                            }`}
                        >
                            <div
                                className={`p-0 text-base flex justify-start items-center w-fit gap-2 cursor-pointer ${
                                    isAuthor ? 'flex-row-reverse' : ''
                                }`}
                            >
                                <div
                                    title={formatDate(m.createdAt)}
                                    className={`p-0 relative text-base flex justify-start items-center w-fit cursor-pointer ${
                                        isAuthor ? 'flex-row-reverse' : 'pl-10'
                                    } ${m.reacts?.length > 0 ? 'mb-2' : ''}`}
                                >
                                    {
                                        // if message has attachments
                                        m.attachments?.length > 0 && m.attachments[0].type === 'image' ? (
                                            <AttachmentListRender
                                                attachments={m.attachments}
                                                currentMessage={currentMessage}
                                                prevMessage={prevMessage}
                                                index={index}
                                                message={m}
                                            />
                                        ) : (
                                            m.attachments?.length > 0 &&
                                            m.attachments[0].type === 'file' && (
                                                <MessageFileRender attachments={m.attachments} message={m} />
                                            )
                                        )
                                    }
                                    {m.sticker && (
                                        <div id={'message-' + m.id}>
                                            <SpriteRenderer size={120} src={m.sticker} />
                                        </div>
                                    )}

                                    {m.gif && (
                                        <LazyLoadImage
                                            id={'message-' + m.id}
                                            src={m.gif}
                                            className={`${
                                                (currentMessage.author.id !== prevMessage?.author.id && index !== 0) ||
                                                index === 0
                                                    ? `${
                                                          user?.id === m.author.id
                                                              ? 'rounded-tr '
                                                              : 'rounded-tl '
                                                      }`
                                                    : `${user?.id === m.author.id ? 'rounded-r-md ' : 'rounded-l-md  '}`
                                            } w-52 h-fit rounded-xl object-cover cursor-default`}
                                        />
                                    )}

                                    {m.reacts?.length > 0 && (
                                        <ReactionStatus message={m} setShowModal={setShowReactionStatusModal} />
                                    )}
                                </div>
                                <div
                                    className={`invisible group-hover:visible flex gap-1 ${
                                        isAuthor ? 'flex-row-reverse' : ''
                                    }`}
                                >
                                    <MessageReaction message={m} />
                                    <MessageReplyIcon setReplyInfo={setReplyInfo} message={m} />
                                    <MessageOption message={m} setIsEditing={setIsEditing} />
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </>
    );
};
