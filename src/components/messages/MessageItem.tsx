import { Dispatch, FC, useContext } from 'react';
import { AuthContext } from '../../contex/AuthContext';
import { MessageMenuContext } from '../../contex/MessageMenuContext';
import { formatDate } from '../../utils/helpers';
import { GroupMessageType, MessageType } from '../../utils/types';
import { AttachmentListRender } from '../attachments/AttachmentListRender';
import { MessageReaction } from '../reactions/MessageReaction';
import ReactionStatus from '../reactions/ReactionStatus';
import { EditMessageContainer } from './EditMessageContainer';
import { MessageOption } from './MessageOption';
type Props = {
    m: MessageType | GroupMessageType;
    currentMessage: MessageType | GroupMessageType;
    prevMessage: MessageType | GroupMessageType;
    index: number;
    isEditing: boolean;
    setIsEditing: Dispatch<React.SetStateAction<boolean>>;
    onEditMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const MessageItem: FC<Props> = ({
    m,
    currentMessage,
    prevMessage,
    index,
    isEditing,
    setIsEditing,
    onEditMessageChange,
}) => {
    const { user } = useContext(AuthContext);
    const { editMessage } = useContext(MessageMenuContext);
    const isAuthor = user?.id === m.author.id;
    return (
        <div
            key={m.id}
            className={`flex flex-col justify-end  ${m.content && m.attachments?.length === 0 ? ' gap-0 ' : 'gap-1 '}`}
        >
            {m.content && (
                <div
                    className={`flex gap-4 items-center break-all w-5/6 group ${
                        isAuthor ? 'place-self-end justify-end' : 'place-self-start justify-start'
                    }`}
                    key={m.id}
                >
                    {isEditing && m.id === editMessage?.id ? (
                        <div className="p-0 pl-14 text-base flex justify-start items-center w-full mt-2">
                            <EditMessageContainer
                                onEditMessageChange={onEditMessageChange}
                                editMessage={editMessage}
                                setIsEditing={setIsEditing}
                            />
                        </div>
                    ) : (
                        <div
                            className={`p-0 pl-14 text-base flex justify-start items-center w-fit gap-2 ${
                                isAuthor ? 'flex-row-reverse' : ''
                            }`}
                        >
                            <div
                                title={formatDate(m.createdAt)}
                                className={`relative ${m.reacts?.length > 0 ? 'mb-2' : ''} ${
                                    (currentMessage.author.id !== prevMessage?.author.id && index !== 0) || index === 0
                                        ? `${
                                              isAuthor
                                                  ? `${
                                                        m.attachments?.length === 0
                                                            ? 'rounded-tr-none '
                                                            : 'rounded-r-md '
                                                    }`
                                                  : `${
                                                        m.attachments?.length === 0
                                                            ? 'rounded-tl-none '
                                                            : 'rounded-l-md '
                                                    }`
                                          }`
                                        : `${isAuthor ? 'rounded-r-md ' : 'rounded-l-md '}`
                                }bg-dark-header py-2 px-5 rounded-2xl`}
                            >
                                {m.content}
                                {m.reacts?.length > 0 && <ReactionStatus message={m} />}
                            </div>
                            <div
                                className={`invisible group-hover:visible flex  ${isAuthor ? 'flex-row-reverse' : ''}`}
                            >
                                <MessageReaction message={m} />
                                <MessageOption message={m} setIsEditing={setIsEditing} />
                            </div>
                        </div>
                    )}
                </div>
            )}
            {
                // if message has attachments
                m.attachments?.length > 0 && (
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
                                className={`p-0 relative text-base flex justify-start items-center w-fit cursor-pointer ${
                                    isAuthor ? 'flex-row-reverse' : 'pl-14'
                                }`}
                            >
                                <AttachmentListRender
                                    attachments={m.attachments}
                                    currentMessage={currentMessage}
                                    prevMessage={prevMessage}
                                    index={index}
                                    message={m}
                                />
                                {m.reacts?.length > 0 && <ReactionStatus message={m} />}
                            </div>
                            <div
                                className={`invisible group-hover:visible flex  ${isAuthor ? 'flex-row-reverse' : ''}`}
                            >
                                <MessageReaction message={m} />
                                <MessageOption message={m} setIsEditing={setIsEditing} />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};
