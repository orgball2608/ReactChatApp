import { ArrowLeft } from 'akar-icons';
import { Dispatch, FC, useContext } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ImagePreviewModalContext } from '../../contex/ImagePreviewModalContext';
import { RootState } from '../../store';
import { CDN_PREVIEW_URL, CDN_URL } from '../../utils/constants';
import { getFileSize } from '../../utils/helpers';
import { AttachmentType } from '../../utils/types';
import FileIcon from '../icons/FileIcon';
import { FileSideBarHeader } from './FileSideBarHeader';

type Props = {
    setShowMediaFileSideBar: Dispatch<React.SetStateAction<boolean>>;
    setShowFileSideBar: Dispatch<React.SetStateAction<boolean>>;
    showFileSideBar: boolean;
    showMediaFileSideBar: boolean;
};

export const FileSideBar: FC<Props> = ({
    setShowFileSideBar,
    setShowMediaFileSideBar,
    showFileSideBar,
    showMediaFileSideBar,
}) => {
    const { id } = useParams();
    const Id = parseInt(id!);
    const messages = useSelector((state: RootState) => state.messages.messages);
    const selectedMessages = messages.find((message) => message.id === Id);
    const groupMessages = useSelector((state: RootState) => state.groupMessage.messages);
    const selectedGroupMessages = groupMessages.find((message) => message.id === Id);
    const { setShowModal, setAttachment } = useContext(ImagePreviewModalContext);

    const conversationType = useSelector((state: RootState) => state.type.type);

    const attachments: AttachmentType[] = [];
    const files: AttachmentType[] = [];

    if (conversationType === 'group') {
        selectedGroupMessages?.messages.forEach((message) => {
            if (message.attachments.length > 0 && message.attachments[0].type === 'file') {
                message.attachments.forEach((attachment) => {
                    files.push(attachment);
                });
            }
        });
    } else {
        selectedMessages?.messages.forEach((message) => {
            if (message.attachments.length > 0 && message.attachments[0].type === 'file') {
                message.attachments.forEach((attachment) => {
                    files.push(attachment);
                });
            }
        });
    }

    if (conversationType === 'group') {
        selectedGroupMessages?.messages.forEach((message) => {
            if (message.attachments.length > 0 && message.attachments[0].type === 'image') {
                message.attachments.forEach((attachment) => {
                    attachments.push(attachment);
                });
            }
        });
    } else {
        selectedMessages?.messages.forEach((message) => {
            if (message.attachments.length > 0 && message.attachments[0].type === 'image') {
                message.attachments.forEach((attachment) => {
                    attachments.push(attachment);
                });
            }
        });
    }

    const getShortName = (name: string) => {
        if (name && name.length > 15) {
            return name.slice(0, 15) + '...';
        } else {
            return name;
        }
    };
    return (
        <aside className="w-72 h-full flex-none bg-[#141414] px-2 flex flex-col border-border-conversations border-l-[1px] overflow-y-auto items-center animate-side-out">
            <div className="h-14 flex flex-none gap-4 w-full justify-start items-center">
                <div
                    onClick={() => {
                        if (showFileSideBar) setShowFileSideBar(false);
                        else setShowMediaFileSideBar(false);
                    }}
                    className="cursor-pointer p-2 flex justify-center items-center rounded-full hover:bg-[#1c1e21]"
                >
                    <ArrowLeft size={20} />
                </div>
                <span className="text-base flex justify-center items-center font-semibold font-poppins">
                    <span>Media, Links, and Docs</span>
                </span>
            </div>
            <FileSideBarHeader
                setShowFileSideBar={setShowFileSideBar}
                setShowMediaFileSideBar={setShowMediaFileSideBar}
                showFileSideBar={showFileSideBar}
                showMediaFileSideBar={showMediaFileSideBar}
            />
            {showFileSideBar ? (
                <div className="w-full h-full p-1 flex-none">
                    {files.length === 0 ? (
                        <div className="w-full h-full flex justify-center items-center">
                            <span className="text-lg">No media, links, or docs</span>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center gap-1 cursor-pointer ">
                            {files.map((attachment) => (
                                <a
                                    key={attachment.key}
                                    href={`${CDN_URL}${attachment.key}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    download={attachment.name}
                                    className="flex justify-start gap-4 items-center border-b-2 border-border-conversations w-full py-2 px-2"
                                >
                                    <div className="p-3 bg-[#5e5f61] rounded-lg">
                                        <FileIcon color="#050505" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold font-poppins text-white">
                                            {getShortName(attachment.name) || 'No name'}
                                        </span>
                                        <span className="text-xs font-poppins text-[#b3b3b3]">
                                            {getFileSize(attachment.size)}
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="w-full h-full p-1 flex-none">
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
            )}
        </aside>
    );
};
