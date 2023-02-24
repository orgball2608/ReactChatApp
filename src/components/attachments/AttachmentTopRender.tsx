import { FC, useContext } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ImagePreviewModalContext } from '../../contex/ImagePreviewModalContext';
import { CDN_PREVIEW_URL } from '../../utils/constants';
import { AttachmentType, GroupMessageType, MessageType } from '../../utils/types';

type Props = {
    attachments: AttachmentType[];
    message: MessageType | GroupMessageType;
};

export const AttachmentTopRender: FC<Props> = ({ attachments, message }) => {
    const { setShowModal, setAttachment } = useContext(ImagePreviewModalContext);

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
                    className={`w-52 h-fit rounded-xl object-cover transition duration-300 hover:brightness-[85%]`}
                />
            );
        if (attachments.length === 2)
            return (
                <div id={'message-' + message.id} className={`w-full flex flex-wrap gap-[3px] justify-end`}>
                    {attachments.map((attachment: AttachmentType, index) => {
                        return (
                            <LazyLoadImage
                                onClick={() => handleShowAttachments(index)}
                                key={attachment.key}
                                src={CDN_PREVIEW_URL + attachment.key}
                                alt="attachment"
                                className="w-40 h-40 rounded-lg object-cover transition duration-300 hover:brightness-[85%] "
                            />
                        );
                    })}
                </div>
            );

        if (attachments.length === 3)
            return (
                <div id={'message-' + message.id} className={`w-full flex flex-wrap gap-[3px] justify-end rounded-2xl`}>
                    {attachments.map((attachment: AttachmentType, index) => {
                        return (
                            <LazyLoadImage
                                onClick={() => handleShowAttachments(index)}
                                key={attachment.key}
                                src={CDN_PREVIEW_URL + attachment.key}
                                alt="attachment"
                                className="w-32 h-32 rounded-xl object-cover transition duration-300 hover:brightness-[85%] "
                            />
                        );
                    })}
                </div>
            );

        if (attachments.length === 4)
            return (
                <div id={'message-' + message.id} className={`w-fit flex flex-wrap gap-[3px] justify-end`}>
                    {attachments.map((attachment: AttachmentType, index) => {
                        return (
                            <LazyLoadImage
                                key={attachment.key}
                                onClick={() => handleShowAttachments(index)}
                                src={CDN_PREVIEW_URL + attachment.key}
                                alt="attachment"
                                className="w-40 h-40 rounded-lg object-cover transition duration-300 hover:brightness-[85%] "
                            />
                        );
                    })}
                </div>
            );
        else {
            return (
                <div id={'message-' + message.id} className="w-full flex flex-col flex-wrap gap-[3px] justify-end ">
                    <div className={`flex gap-[4px] justify-end`}>
                        {attachments.slice(0, 2).map((attachment: AttachmentType, index) => {
                            return (
                                <LazyLoadImage
                                    onClick={() => handleShowAttachments(index)}
                                    key={attachment.key}
                                    src={CDN_PREVIEW_URL + attachment.key}
                                    alt="attachment"
                                    className="w-48 h-48 rounded-lg transition duration-300 hover:brightness-[85%] "
                                />
                            );
                        })}
                    </div>
                    <div className={`flex gap-[3px] justify-end`}>
                        {attachments.slice(2, 5).map((attachment: AttachmentType, index) => {
                            return (
                                <LazyLoadImage
                                    onClick={() => handleShowAttachments(index)}
                                    key={attachment.key}
                                    src={CDN_PREVIEW_URL + attachment.key}
                                    alt="attachment"
                                    className="w-32 h-32 rounded-lg transition duration-300 hover:brightness-[85%]"
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
