import { ArrowLeft } from 'akar-icons';
import { Dispatch, FC, useContext } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ImagePreviewModalContext } from '../../contex/ImagePreviewModalContext';
import { RootState } from '../../store';
import { CDN_PREVIEW_URL } from '../../utils/constants';
import { AttachmentType } from '../../utils/types';

type Props = {
    setShowFileSideBar: Dispatch<React.SetStateAction<boolean>>;
};

export const MediaFileSideBar: FC<Props> = ({ setShowFileSideBar }) => {
    const { id } = useParams();
    const { setShowModal, setAttachment } = useContext(ImagePreviewModalContext);
    const Id = parseInt(id!);
    const messages = useSelector((state: RootState) => state.messages.messages);
    const selectedMessages = messages.find((message) => message.id === Id);
    const groupMessages = useSelector((state: RootState) => state.groupMessage.messages);
    const selectedGroupMessages = groupMessages.find((message) => message.id === Id);

    const conversationType = useSelector((state: RootState) => state.type.type);

    const attachments: AttachmentType[] = [];

    if (conversationType === 'group') {
        selectedGroupMessages?.messages.forEach((message) => {
            if (message.attachments.length > 0) {
                message.attachments.forEach((attachment) => {
                    attachments.push(attachment);
                });
            }
        });
    } else {
        selectedMessages?.messages.forEach((message) => {
            if (message.attachments.length > 0) {
                message.attachments.forEach((attachment) => {
                    attachments.push(attachment);
                });
            }
        });
    }

    return (
        <aside className="w-72 h-full flex-none bg-[#141414] px-2 gap-4 flex flex-col border-border-conversations border-l-[1px] overflow-y-scroll ">
            <div className="h-14 flex gap-4 w-full justify-start items-center">
                <div
                    onClick={() => setShowFileSideBar(false)}
                    className="cursor-pointer p-2 h-full flex justify-center items-center rounded-full"
                >
                    <ArrowLeft size={20} />
                </div>
                <span className="text-lg h-full">
                    <h1>Media, Links, and Docs</h1>
                </span>
            </div>
            <div className="w-full h-full p-1">
                {attachments.length === 0 ? (
                    <div className="w-full h-full flex justify-center items-center">
                        <span className="text-lg">No media, links, or docs</span>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-1 cursor-pointer ">
                        {attachments.map((attachment) => (
                            <div
                                key={attachment.key}
                                onClick={() => {
                                    setShowModal(true);
                                    setAttachment(attachment);
                                }}
                                className="flex justify-start items-center rounded-md hover:bg-[#1c1e21]"
                            >
                                <LazyLoadImage
                                    src={`${CDN_PREVIEW_URL + attachment.key}`}
                                    alt="media"
                                    effect="blur"
                                    className="w-20 h-20 object-cover"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </aside>
    );
};
