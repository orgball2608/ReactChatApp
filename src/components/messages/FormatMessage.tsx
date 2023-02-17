import { GroupMessageType, MessageType, User } from '../../utils/types';
import { ChangeEvent, Dispatch, FC, SetStateAction, useContext } from 'react';
import moment from 'moment';
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

type FormattedMessageProps = {
    user?: User;
    message: MessageType | GroupMessageType;
    isEditing: boolean;
    onEditMessageChange: (e: ChangeEvent<HTMLInputElement>) => void;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
    isOneElement?: boolean;
};

export const FormattedMessage: FC<FormattedMessageProps> = ({
    user,
    message,
    isEditing,
    onEditMessageChange,
    setIsEditing,
    isOneElement,
}) => {
    const { editMessage } = useContext(MessageMenuContext);
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
                            {getDisplayName(message.author)}
                        </span>
                        <span className="font-semi-bold">{moment(message.createdAt).fromNow()}</span>
                    </div>
                )}

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
                        message.content && (
                            <div
                                className={`text-base flex justify-start items-center w-full group gap-2 ${
                                    isAuthor ? 'flex-row-reverse' : ''
                                }`}
                            >
                                <div
                                    title={formatDate(message.createdAt)}
                                    className={`bg-dark-header py-2 px-5 rounded-2xl relative ${
                                        message.reacts?.length > 0 ? 'mb-2' : ''
                                    } ${
                                        isOneElement
                                            ? `${isAuthor ? 'rounded-r-2xl bg-primary' : 'rounded-l-2xl ml-14'}`
                                            : `${isAuthor ? 'rounded-br-none bg-primary' : 'rounded-bl-none ml-14'}`
                                    } `}
                                >
                                    {message.content}
                                    {message.reacts?.length > 0 && <ReactionStatus message={message} />}
                                </div>
                                <div
                                    className={`invisible group-hover:visible flex ${
                                        isAuthor ? 'flex-row-reverse' : ''
                                    }`}
                                >
                                    <MessageReaction message={message} />
                                    <MessageOption message={message} setIsEditing={setIsEditing} />
                                </div>
                            </div>
                        )
                    )}
                    {(message.attachments?.length > 0 || message.gif) && (
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
                                        isAuthor ? 'flex-row-reverse' : 'pl-14'
                                    } ${message.reacts?.length > 0 ? 'mb-2' : ''}`}
                                >
                                    {
                                        // if message has attachments
                                        message.attachments?.length > 0 ? (
                                            <AttachmentTopRender attachments={message.attachments} message={message} />
                                        ) : (
                                            <LazyLoadImage
                                                src={message.gif}
                                                className={` ${
                                                    isOneElement
                                                        ? `${isAuthor ? 'rounded-r-2xl' : 'rounded-l-2xl'}`
                                                        : `${isAuthor ? 'rounded-br-none' : 'rounded-bl-none'}`
                                                } 
                                                w-52 h-fit rounded-md object- cursor-default`}
                                            />
                                        )
                                    }
                                    {message.reacts?.length > 0 && <ReactionStatus message={message} />}
                                </div>
                                <div
                                    className={`invisible group-hover:visible flex  ${
                                        isAuthor ? 'flex-row-reverse' : ''
                                    }`}
                                >
                                    <MessageReaction message={message} />
                                    <MessageOption message={message} setIsEditing={setIsEditing} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
