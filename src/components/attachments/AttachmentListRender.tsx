import { FC, useContext } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AuthContext } from '../../contex/AuthContext';
import { ImagePreviewModalContext } from '../../contex/ImagePreviewModalContext';
import { CDN_PREVIEW_URL } from '../../utils/constants';
import { AttachmentType, GroupMessageType, MessageType } from '../../utils/types';

type Props = {
    attachments: AttachmentType[];
    currentMessage: MessageType | GroupMessageType;
    prevMessage: MessageType | GroupMessageType;
    index: number;
    message: MessageType | GroupMessageType;
};

export const AttachmentListRender: FC<Props> = ({ attachments, currentMessage, prevMessage, message, index }) => {
    const { user } = useContext(AuthContext);
    const { setShowModal, setAttachment } = useContext(ImagePreviewModalContext);
    const isAuthor = user?.id === message.author.id;

    const handleShowAttachments = (i: number) => {
        setAttachment(attachments[i]);
        setShowModal(true);
    };
    const renderAttachments = () => {
        if (!attachments || attachments.length === 0) return null;
        if (attachments.length === 1)
            return (
                <LazyLoadImage
                    id={'message-' + message.id}
                    onClick={() => handleShowAttachments(0)}
                    src={CDN_PREVIEW_URL + attachments[0].key}
                    alt="attachment"
                    className={`${
                        (currentMessage.author.id !== prevMessage?.author.id && index !== 0) || index === 0
                            ? `${user?.id === message.author.id ? 'rounded-tr-none ' : 'rounded-tl-none '}`
                            : `${user?.id === message.author.id ? 'rounded-r-md ' : 'rounded-l-md  '}`
                    } w-52 h-fit rounded-xl object-cover transition duration-300 hover:brightness-[85%]`}
                />
            );
        if (attachments.length === 2)
            return (
                <div
                    id={'message-' + message.id}
                    className={`w-full flex flex-wrap gap-[3px] justify-end ${
                        (currentMessage.author.id !== prevMessage?.author.id && index !== 0) || index === 0
                            ? `${user?.id === message.author.id ? 'rounded-tr-none ' : 'rounded-tl-none '}`
                            : `${user?.id === message.author.id ? 'rounded-r-md ' : 'rounded-l-md  '}`
                    } `}
                >
                    {attachments.map((attachment: AttachmentType, index) => {
                        return (
                            <LazyLoadImage
                                onClick={() => handleShowAttachments(index)}
                                key={attachment.key}
                                src={CDN_PREVIEW_URL + attachment.key}
                                alt="attachment"
                                className="md:h-40 md:w-40 w-52 h-fit rounded-lg object-cover transition duration-300 hover:brightness-[85%] "
                            />
                        );
                    })}
                </div>
            );

        if (attachments.length === 3)
            return (
                <div
                    id={'message-' + message.id}
                    className={`w-full flex flex-wrap gap-[3px] justify-end rounded-2xl ${
                        (currentMessage.author.id !== prevMessage?.author.id && index !== 0) || index === 0
                            ? `${isAuthor ? 'rounded-tr-none ' : 'rounded-tl-none '}`
                            : `${isAuthor ? 'rounded-r-md ' : 'rounded-l-md  '}`
                    } `}
                >
                    {attachments.map((attachment: AttachmentType, index) => {
                        return (
                            <LazyLoadImage
                                onClick={() => handleShowAttachments(index)}
                                key={attachment.key}
                                src={CDN_PREVIEW_URL + attachment.key}
                                alt="attachment"
                                className="md:w-40 md:h-40 w-52 h-fit rounded-xl object-cover transition duration-300 hover:brightness-[85%] "
                            />
                        );
                    })}
                </div>
            );

        if (attachments.length === 4)
            return (
                <div
                    id={'message-' + message.id}
                    className={`md:w-86 w-fit flex flex-wrap gap-[3px] ${
                        (currentMessage.author.id !== prevMessage?.author.id && index !== 0) || index === 0
                            ? `${
                                  user?.id === message.author.id
                                      ? 'rounded-tr-none justify-end '
                                      : 'rounded-tl-none justify-start '
                              }`
                            : `${
                                  user?.id === message.author.id
                                      ? 'rounded-r-md  justify-end '
                                      : 'rounded-l-md justify-start '
                              }`
                    } `}
                >
                    {attachments.map((attachment: AttachmentType, index) => {
                        return (
                            <LazyLoadImage
                                onClick={() => handleShowAttachments(index)}
                                key={attachment.key}
                                src={CDN_PREVIEW_URL + attachment.key}
                                alt="attachment"
                                className="md:h-40 md:w-40 w-52 h-fit rounded-lg object-cover transition duration-300 hover:brightness-[85%] "
                            />
                        );
                    })}
                </div>
            );
        else {
            return (
                <div id={'message-' + message.id} className="w-full flex flex-col flex-wrap gap-[3px] justify-end ">
                    <div
                        className={`flex gap-[4px] justify-end ${
                            (currentMessage.author.id !== prevMessage?.author.id && index !== 0) || index === 0
                                ? `${
                                      user?.id === message.author.id
                                          ? 'rounded-tr-none justify-end '
                                          : 'rounded-tl-none justify-start '
                                  }`
                                : `${
                                      user?.id === message.author.id
                                          ? 'rounded-r-md  justify-end '
                                          : 'rounded-l-md justify-start '
                                  }`
                        }`}
                    >
                        {attachments.slice(0, 2).map((attachment: AttachmentType, index) => {
                            return (
                                <LazyLoadImage
                                    onClick={() => handleShowAttachments(index)}
                                    key={attachment.key}
                                    src={CDN_PREVIEW_URL + attachment.key}
                                    alt="attachment"
                                    className="md:w-48 md:h-48 w-52 h-fit rounded-lg transition duration-300 hover:brightness-[85%] "
                                />
                            );
                        })}
                    </div>
                    <div
                        className={`flex gap-[3px] justify-end ${
                            (currentMessage.author.id !== prevMessage?.author.id && index !== 0) || index === 0
                                ? `${
                                      user?.id === message.author.id
                                          ? 'rounded-tr-none justify-end '
                                          : 'rounded-tl-none justify-start '
                                  }`
                                : `${
                                      user?.id === message.author.id
                                          ? 'rounded-r-md  justify-end '
                                          : 'rounded-l-md justify-start '
                                  }`
                        }`}
                    >
                        {attachments.slice(2, 5).map((attachment: AttachmentType, index) => {
                            return (
                                <LazyLoadImage
                                    onClick={() => handleShowAttachments(index)}
                                    key={attachment.key}
                                    src={CDN_PREVIEW_URL + attachment.key}
                                    alt="attachment"
                                    className="md:w-32 md:h-32 w-52 h-fit rounded-lg transition duration-300 hover:brightness-[85%] "
                                />
                            );
                        })}
                    </div>
                </div>
            );
        }
    };
    return renderAttachments();
};
