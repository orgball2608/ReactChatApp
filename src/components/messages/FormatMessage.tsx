import { GroupMessageType, MessageType, User } from '../../utils/types';
import React, { ChangeEvent, Dispatch, FC, SetStateAction, useContext } from 'react';
import moment from 'moment';
import { MessageMenuContext } from '../../contex/MessageMenuContext';
import { EditMessageContainer } from './EditMessageContainer';
import { MessageOption } from './MessageOption';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import defaultAvatar from '../../__assets__/default_avatar.jpg';
import { LazyLoadImage } from 'react-lazy-load-image-component';

type FormattedMessageProps = {
    user?: User;
    message: MessageType | GroupMessageType;
    handleShowMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, message: MessageType | GroupMessageType) => void;
    isEditing: boolean;
    onEditMessageChange: (e: ChangeEvent<HTMLInputElement>) => void;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
    isOneElement?: boolean;
};

export const FormattedMessage: FC<FormattedMessageProps> = ({
    user,
    message,
    handleShowMenu,
    isEditing,
    onEditMessageChange,
    setIsEditing,
    isOneElement,
}) => {
    const { editMessage } = useContext(MessageMenuContext);
    const conversationType = useSelector((state: RootState) => state.type.type);
    const getAvatar = () => {
        if (conversationType === 'private') {
            if (message.author.profile) return message.author.profile.avatar;
            return defaultAvatar;
        }
        return defaultAvatar;
    };
    return (
        <div
            className={`flex gap-4 pt-3 pb-1 items-center w-5/6 ${
                user?.id === message.author.id ? 'place-self-end justify-end' : 'place-self-start'
            }`}
        >
            <div className=" flex-col gap-3 w-full">
                <div className={`flex gap-3 py-1  ${user?.id === message.author.id ? 'justify-end' : ''}`}>
                    {conversationType === 'group' ? (
                        <div className={`w-10 h-10 rounded-full bg-red-500 flex-0`}></div>
                    ) : (
                        <LazyLoadImage
                            src={getAvatar()}
                            alt="avatar"
                            className={`w-10 h-10 rounded-full flex-0 object-cover `}
                        />
                    )}

                    <span
                        className="text-[#6d6d6d] text-base font-bold"
                        style={{
                            color: user?.id === message.author.id ? '#989898' : '#5E8BFF',
                        }}
                    >
                        {message.author.lastName} {message.author.firstName}
                    </span>
                    <span className="font-semi-bold">{moment(message.createdAt).fromNow()}</span>
                </div>
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
                        className={`text-base flex justify-start items-center w-full group ${
                            user?.id === message.author.id ? 'flex-row-reverse' : ''
                        }`}
                    >
                        <div
                            className={`bg-dark-header py-2 px-5 rounded-2xl  ${
                                isOneElement
                                    ? `${user?.id === message.author.id ? 'rounded-r-2xl' : 'rounded-l-2xl ml-14'}`
                                    : `${user?.id === message.author.id ? 'rounded-br-none' : 'rounded-bl-none ml-14'}`
                            } `}
                        >
                            {message.content}
                        </div>
                        <div className="invisible group-hover:visible">
                            <MessageOption message={message} handleShowMenu={handleShowMenu} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
