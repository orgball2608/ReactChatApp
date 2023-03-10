import { Conversation, Group, GroupMessageType, MessageType, User } from '../../utils/types';
import { ChangeEvent, Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import { MessageMenuContext } from '../../contex/MessageMenuContext';
import { EditMessageContainer } from './EditMessageContainer';
import { MessageOption } from './MessageOption';
import { defaultAvatar } from '../../utils/constants';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AttachmentTopRender } from '../attachments/AttachmentTopRender';
import { MessageReaction } from '../reactions/MessageReaction';
import ReactionStatus from '../reactions/ReactionStatus';
import { formatDate } from '../../utils/helpers';
import { getDisplayName } from '../../utils/helpers';
import SpriteRenderer from '../inputs/SpriteRenderer';
import { MessageReplyIcon } from './MessageReplyIcon';
import { MessageReplyBadge } from './MessageReplyBadge';
import { DeletedMessage } from './DeletedMessage';
import { ReactionStatusModal } from '../modals/ReactionStatusModal';
import { MessageFileRender } from './MessageFileRender';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useParams } from 'react-router-dom';

type FormattedMessageProps = {
    user?: User;
    message: MessageType | GroupMessageType;
    isEditing: boolean;
    onEditMessageChange: (e: ChangeEvent<HTMLInputElement>) => void;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
    isOneElement?: boolean;
    setReplyInfo: React.Dispatch<React.SetStateAction<MessageType | GroupMessageType | undefined>>;
};

export const FormattedMessage: FC<FormattedMessageProps> = ({
    user,
    message,
    isEditing,
    onEditMessageChange,
    setIsEditing,
    isOneElement,
    setReplyInfo,
}) => {
    const { editMessage } = useContext(MessageMenuContext);
    const [showReactionStatusModal, setShowReactionStatusModal] = useState<boolean>(false);
    const { id } = useParams<{ id: string }>();
    const conversationType = useSelector((state: RootState) => state.type.type);
    const conversations = useSelector((state: RootState) => state.conversation.conversations);
    const selectedConversation = conversations.find((conversation: Conversation) => conversation.id === parseInt(id!));
    const groups = useSelector((state: RootState) => state.group.groups);
    const selectedGroup = groups.find((group: Group) => group.id === parseInt(id!));

    const getNickname = () => {
        if (conversationType === 'private') {
            if (!selectedConversation?.nicknames) return;
            const nickname = selectedConversation?.nicknames.find((nickname) => nickname.user.id === message.author.id);
            if (nickname) return nickname.nickname;
        } else {
            if (!selectedGroup?.nicknames) return;
            const nickname = selectedGroup?.nicknames.find((nickname) => nickname.user?.id === message.author.id);
            if (nickname) return nickname.nickname;
        }
    };

    const getNicknameOrName = () => {
        const displayName = getDisplayName(message.author);
        if (getNickname()) {
            return getNickname();
        }
        return displayName;
    };

    const getAvatar = () => {
        if (message.author.profile) {
            if (message.author.profile.avatar) {
                return message.author.profile.avatar;
            }
            return defaultAvatar;
        }
        return defaultAvatar;
    };
    const isAuthor = user?.id === message.author.id;
    return (
        <>
            {showReactionStatusModal && (
                <ReactionStatusModal message={message} setShowModal={setShowReactionStatusModal} />
            )}
            <div
                className={`flex gap-4 pt-3 items-center w-5/6 ${
                    isAuthor ? 'place-self-end justify-end' : 'place-self-start'
                }`}
            >
                <div className=" flex-col gap-3 w-full">
                    {!isAuthor && (
                        <div
                            title={getDisplayName(message.author)}
                            className={`flex gap-3 py-1  ${isAuthor ? 'justify-end' : ''}`}
                        >
                            <LazyLoadImage
                                src={getAvatar()}
                                alt="avatar"
                                className={`w-10 h-10 rounded-full flex-0 object-cover `}
                            />
                            <span
                                className="text-[#6d6d6d] text-base font-bold"
                                style={{
                                    color: isAuthor ? '#989898' : '#5E8BFF',
                                }}
                            >
                                {getNicknameOrName()}
                            </span>
                        </div>
                    )}

                    {message.deletedAt ? (
                        <div key={message.id} className="flex flex-col justify-end">
                            <div
                                className={`flex gap-4 items-center w-5/6 group ${
                                    isAuthor ? 'place-self-end justify-end' : 'place-self-start justify-start'
                                }`}
                            >
                                <div
                                    className={`p-0 text-base flex justify-start items-center w-fit gap-2 cursor-pointer ${
                                        isAuthor ? 'flex-row-reverse' : ' ml-14 '
                                    }`}
                                >
                                    <div
                                        id={'message-' + message.id}
                                        title={formatDate(message.createdAt)}
                                        className={`p-0 relative text-base flex justify-end items-center w-fit cursor-pointer 
                                        } ${message.reacts?.length > 0 ? 'mb-2' : ''}`}
                                    >
                                        <DeletedMessage />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : message.content ? (
                        <div key={message.id} className={`flex flex-col justify-end`}>
                            {isEditing && message.id === editMessage?.id ? (
                                <div className="text-base flex justify-start items-center">
                                    <EditMessageContainer
                                        onEditMessageChange={onEditMessageChange}
                                        editMessage={editMessage}
                                        setIsEditing={setIsEditing}
                                    />
                                </div>
                            ) : (
                                <div
                                    className={`text-base flex flex-col w-full group  ${
                                        isAuthor ? 'flex-row-reverse' : ''
                                    }`}
                                >
                                    {message.reply && (
                                        <div
                                            className={`${!isAuthor && 'ml-14'} -mb-2 ${
                                                isAuthor ? 'flex-row-reverse' : ''
                                            } flex justify-start `}
                                        >
                                            <MessageReplyBadge message={message.reply} />
                                        </div>
                                    )}
                                    <div
                                        className={`flex justify-start gap-2 ${
                                            isAuthor ? 'items-end' : 'items-start'
                                        } ${isAuthor ? 'flex-row-reverse' : ''}`}
                                    >
                                        <div
                                            id={'message-' + message.id}
                                            title={formatDate(message.createdAt)}
                                            className={`bg-dark-header py-2 px-5 rounded-2xl relative ${
                                                message.reacts?.length > 0 ? 'mb-2' : ''
                                            } ${
                                                isOneElement
                                                    ? `${isAuthor ? 'rounded-r-2xl bg-primary' : 'rounded-l-2xl ml-14'}`
                                                    : `${
                                                          isAuthor
                                                              ? 'rounded-br-none bg-primary'
                                                              : 'rounded-bl-none ml-14'
                                                      }`
                                            } `}
                                        >
                                            {message.content}
                                            {message.reacts?.length > 0 && (
                                                <ReactionStatus
                                                    message={message}
                                                    setShowModal={setShowReactionStatusModal}
                                                />
                                            )}
                                        </div>
                                        <div
                                            className={`invisible group-hover:visible flex ${
                                                isAuthor ? 'flex-row-reverse' : ''
                                            }`}
                                        >
                                            <MessageReaction message={message} />
                                            <MessageReplyIcon setReplyInfo={setReplyInfo} message={message} />
                                            <MessageOption message={message} setIsEditing={setIsEditing} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        (message.attachments?.length > 0 || message.gif || message.sticker) && (
                            <div key={message.id} className="flex flex-col justify-end">
                                <div
                                    className={`flex gap-4 items-center w-5/6 ${
                                        isAuthor ? 'place-self-end justify-end' : 'place-self-start justify-start'
                                    } ${message.attachments?.length > 0 ? 'mt-1 ' : ''}}`}
                                >
                                    <div
                                        className={`p-0 text-base group flex justify-start items-center w-fit gap-2 cursor-pointer ${
                                            isAuthor ? 'flex-row-reverse' : ''
                                        }`}
                                    >
                                        <div
                                            title={formatDate(message.createdAt)}
                                            className={`p-0 relative text-base flex justify-start items-center w-fit cursor-pointer ${
                                                isAuthor ? '' : 'pl-14'
                                            } ${message.reacts?.length > 0 ? 'mb-2' : ''}`}
                                        >
                                            {
                                                // if message has attachments
                                                message.attachments?.length > 0 &&
                                                message.attachments[0].type === 'image' ? (
                                                    <AttachmentTopRender
                                                        attachments={message.attachments}
                                                        message={message}
                                                    />
                                                ) : (
                                                    message.attachments?.length > 0 &&
                                                    message.attachments[0].type === 'file' && (
                                                        <MessageFileRender
                                                            attachments={message.attachments}
                                                            message={message}
                                                        />
                                                    )
                                                )
                                            }

                                            {message.sticker && (
                                                <div id={'message-' + message.id}>
                                                    <SpriteRenderer size={120} src={message.sticker} />
                                                </div>
                                            )}

                                            {message.gif && (
                                                <LazyLoadImage
                                                    id={'message-' + message.id}
                                                    src={message.gif}
                                                    className={` ${
                                                        isOneElement
                                                            ? `${isAuthor ? 'rounded-r-2xl' : 'rounded-l-2xl'}`
                                                            : `${isAuthor ? 'rounded-br-none' : 'rounded-bl-none'}`
                                                    } 
                                                    w-52 h-fit rounded-md object- cursor-default`}
                                                />
                                            )}

                                            {message.reacts?.length > 0 && (
                                                <ReactionStatus
                                                    message={message}
                                                    setShowModal={setShowReactionStatusModal}
                                                />
                                            )}
                                        </div>
                                        <div
                                            className={`invisible group-hover:visible flex  ${
                                                isAuthor ? 'flex-row-reverse' : ''
                                            }`}
                                        >
                                            <MessageReaction message={message} />
                                            <MessageReplyIcon setReplyInfo={setReplyInfo} message={message} />
                                            <MessageOption message={message} setIsEditing={setIsEditing} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    );
};
