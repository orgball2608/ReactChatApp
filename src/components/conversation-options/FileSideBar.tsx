import { ArrowLeft } from 'akar-icons';
import React, { Dispatch, FC, useContext, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ImagePreviewModalContext } from '../../contex/ImagePreviewModalContext';
import { RootState } from '../../store';
import { CDN_PREVIEW_URL, CDN_URL } from '../../utils/constants';
import { getFileSize } from '../../utils/helpers';
import FileIcon from '../icons/FileIcon';
import { FileSideBarHeader } from './FileSideBarHeader';
import { GetConversationAttachments, GetGroupAttachments } from '../../services/api';
import { AttachmentType } from '../../utils/types';

type Props = {
    setShowMediaFileSideBar: Dispatch<React.SetStateAction<boolean>>;
    setShowFileSideBar: Dispatch<React.SetStateAction<boolean>>;
    showFileSideBar: boolean;
    showMediaFileSideBar: boolean;
};

export const FileSideBar: FC<Props> =React.memo( ({
    setShowFileSideBar,
    setShowMediaFileSideBar,
    showFileSideBar,
    showMediaFileSideBar,
}) => {
    const { id } = useParams();
    const Id = parseInt(id!);
    const { setShowModal, setAttachment } = useContext(ImagePreviewModalContext);
    const conversationType = useSelector((state: RootState) => state.type.type);
    const [conversationAttachments,setConversationAttachments] = useState<any[]>([])

    useEffect(() => {
        if(conversationType === 'private'){
            GetConversationAttachments(Id).then(({data})=>{
                setConversationAttachments(data)
            })
        }
        else {
            GetGroupAttachments(Id).then(({data})=>{
                setConversationAttachments(data)
            })
        }
    },[Id,conversationType])

    const attachments: AttachmentType[] = [];
    const files: AttachmentType[] = [];

    conversationAttachments.forEach((attachment) => {
        if (attachment.length > 0 && attachment[0].type === 'file') {
            attachment.forEach((a:AttachmentType) => {
                files.push(a);
            });
        }
    });

    conversationAttachments?.forEach((attachment) => {
        if (attachment.length > 0 && attachment[0].type === 'image') {
            attachment.forEach((a:AttachmentType)=> {
                attachments.push(a);
            });
        }
    });

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
                <span className="text-base flex justify-center items-center font-medium">
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
                <div className="w-full h-fit p-1 flex-none">
                    {attachments.length === 0 ? (
                        <div className="w-full h-full flex justify-center items-center">
                            <span className="text-base text-[#b3b3b3]">No media, links, or docs</span>
                        </div>
                    ) : (
                        <div className="flex flex-col h-fit justify-center gap-1 cursor-pointer ">
                            {files.map((attachment) => (
                                <a
                                    key={attachment.key}
                                    href={`${CDN_URL}${attachment.key}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    download={attachment.name}
                                    className="flex justify-start gap-4 items-center border-b-2 border-border-conversations w-full py-2 px-2"
                                >
                                    <div className="p-3 bg-dark-lighten rounded-lg">
                                        <FileIcon color="#ffffff" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-medium text-white">
                                            {getShortName(attachment.name) || 'No name'}
                                        </span>
                                        <span className="text-xs  text-[#b3b3b3]">
                                            {getFileSize(attachment.size)}
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="w-full h-fit p-1 flex-none">
                    {attachments.length === 0 ? (
                        <div className="w-full h-full flex justify-center items-center">
                            <span className="text-base text-[#b3b3b3]">No media, links, or docs</span>
                        </div>
                    ) : (
                        <div className=" h-fit flex flex-wrap gap-1 cursor-pointer ">
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
});
