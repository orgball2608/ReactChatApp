import { FC, useContext } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AuthContext } from '../../contex/AuthContext';
import { CDN_PREVIEW_URL } from '../../utils/constants';
import { AttachmentType, GroupMessageType, MessageType } from '../../utils/types';

type Props = {
    attachments: AttachmentType[];
    message: MessageType | GroupMessageType;
};

export const AttachmentTopRender: FC<Props> = ({ attachments, message }) => {
    const { user } = useContext(AuthContext);
    const renderAttachments = () => {
        if (attachments.length === 0) return null;
        if (attachments.length === 1)
            return (
                <LazyLoadImage
                    src={CDN_PREVIEW_URL + attachments[0].key}
                    alt="attachment"
                    effect="blur"
                    className={`w-52 h-52 rounded-xl object-cover`}
                />
            );
        if (attachments.length === 2)
            return (
                <div className={`w-full flex flex-wrap gap-[3px] justify-end`}>
                    {attachments.map((attachment: AttachmentType) => {
                        return (
                            <LazyLoadImage
                                key={attachment.key}
                                src={CDN_PREVIEW_URL + attachment.key}
                                alt="attachment"
                                effect="blur"
                                className="w-40 h-40 rounded-lg object-cover "
                            />
                        );
                    })}
                </div>
            );

        if (attachments.length === 3)
            return (
                <div className={`w-full flex flex-wrap gap-[3px] justify-end rounded-2xl`}>
                    {attachments.map((attachment: AttachmentType) => {
                        return (
                            <LazyLoadImage
                                key={attachment.key}
                                src={CDN_PREVIEW_URL + attachment.key}
                                alt="attachment"
                                effect="blur"
                                className="w-32 h-32 rounded-xl object-cover "
                            />
                        );
                    })}
                </div>
            );

        if (attachments.length === 4)
            return (
                <div className={`w-fit flex flex-wrap gap-[3px] justify-end`}>
                    {attachments.map((attachment: AttachmentType) => {
                        return (
                            <LazyLoadImage
                                key={attachment.key}
                                src={CDN_PREVIEW_URL + attachment.key}
                                alt="attachment"
                                effect="blur"
                                className="w-40 h-40 rounded-lg object-cover "
                            />
                        );
                    })}
                </div>
            );
        else {
            return (
                <div className="w-full flex flex-col flex-wrap gap-[3px] justify-end ">
                    <div className={`flex gap-[4px] justify-end`}>
                        {attachments.slice(0, 2).map((attachment: AttachmentType) => {
                            return (
                                <LazyLoadImage
                                    key={attachment.key}
                                    src={CDN_PREVIEW_URL + attachment.key}
                                    alt="attachment"
                                    effect="blur"
                                    className="w-48 h-48 rounded-lg "
                                />
                            );
                        })}
                    </div>
                    <div className={`flex gap-[3px] justify-end`}>
                        {attachments.slice(2, 5).map((attachment: AttachmentType) => {
                            return (
                                <LazyLoadImage
                                    key={attachment.key}
                                    src={CDN_PREVIEW_URL + attachment.key}
                                    alt="attachment"
                                    effect="blur"
                                    className="w-32 h-32 rounded-lg "
                                />
                            );
                        })}
                    </div>
                </div>
            );
        }
    };
    return (
        <div
            className={`p-0 pl-14 text-base flex justify-start items-center w-fit ${
                user?.id === message.author.id ? 'flex-row-reverse' : ''
            }`}
        >
            {renderAttachments()}
        </div>
    );
};
