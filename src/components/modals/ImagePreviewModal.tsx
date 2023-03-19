import { ChevronLeft, ChevronRight, CloudDownload, Cross } from 'akar-icons';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ImagePreviewModalContext } from '../../contex/ImagePreviewModalContext';
import { RootState } from '../../store';
import { CDN_ORIGINAL_URL } from '../../utils/constants';
import { AttachmentType } from '../../utils/types';
import { GetConversationAttachments, GetGroupAttachments } from '../../services/api';
import { useCurrentViewportView } from '../../hooks/useCurrentViewportView';

export const ImagePreviewModal = () => {
    const { setShowModal, attachment } = useContext(ImagePreviewModalContext);
    const [currentAttachment, setCurrentAttachment] = useState<AttachmentType | undefined>(attachment);
    const [conversationAttachments,setConversationAttachments] = useState<any[]>([])
    const { isMobile } = useCurrentViewportView();
    const { id } = useParams();
    const Id = parseInt(id!);
    const conversationType = useSelector((state: RootState) => state.type.type);

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

    conversationAttachments?.forEach((attachment) => {
        if (attachment.length > 0 && attachment[0].type === 'image') {
            attachment.forEach((a:AttachmentType)=> {
                attachments.push(a);
            });
        }
    });

    const index = attachments.findIndex((item) => item.key === currentAttachment?.key);
    const nextIndex = index + 1;
    const prevIndex = index - 1;
    const nextAttachment = attachments[nextIndex];
    const prevAttachment = attachments[prevIndex];

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowLeft') {
            if (prevIndex < 0) {
                return;
            }
            setCurrentAttachment(prevAttachment);
        } else if (e.key === 'ArrowRight') {
            if (nextIndex >= attachments.length) {
                return;
            }
            setCurrentAttachment(nextAttachment);
        } else if (e.key === 'Escape') {
            setShowModal(false);
        }
    };

    return (
        <div
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${
                    CDN_ORIGINAL_URL + currentAttachment?.key
                })`,
            }}
            className="w-full h-full fixed left-0 top-0 flex flex-col justify-center items-start z-50 bg-cover bg-modal-background animate-fade-in backdrop-filter backdrop-blur-[100px] opacity-10"
            tabIndex={-1}
            onKeyDown={handleKeyDown}
        >
            <div
                onClick={() => setShowModal(false)}
                className="flex justify-center items-center cursor-pointer absolute top-4 left-4 p-2 rounded-full bg-white z-50"
            >
                <Cross size={isMobile ? 15: 20} className="text-dark-light" />
            </div>

            <div className="flex justify-center items-center cursor-pointer absolute top-4 right-4 rounded-full z-50 hover:bg-[#686868]">
                <a
                    href={CDN_ORIGINAL_URL + currentAttachment?.key}
                    download
                    target={'_blank'}
                    className="flex justify-center items-center p-2 bg-[#1c1e21] hover:bg-[#4a4c4e] rounded-full " rel="noreferrer"
                >
                    <CloudDownload strokeWidth={2} size={isMobile ? 18: 24} />
                </a>
            </div>

            <div className={`w-full h-full bg-cover bg-center`}>
                <img
                    src={CDN_ORIGINAL_URL + currentAttachment?.key}
                    alt="orginal_attachment"
                    className="object-contain w-full h-full"
                />
            </div>
            {prevIndex < 0 ? null : (
                <div
                    onClick={() => setCurrentAttachment(prevAttachment)}
                    className="absolute top-1/2 transform -translate-y-1/2 left-0 bg-[#1c1e21] hover:bg-[#4a4c4e] transition-colors duration-300 z-30 h-full lg:px-3 px-1 flex justify-end items-center cursor-pointer group"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)' }}
                >
                    <div className="flex justify-center items-center p-2 bg-[#1c1e21] hover:bg-[#4a4c4e] rounded-full transition duration-500 ease-in-out transform group-hover:-translate-x-2">
                        <ChevronLeft size={isMobile ? 20: 30} className="text-white" />
                    </div>
                </div>
            )}
            {nextIndex >= attachments.length ? null : (
                <div
                    onClick={() => setCurrentAttachment(nextAttachment)}
                    className="absolute top-1/2 transform -translate-y-1/2 right-0 bg-[#1c1e21] hover:bg-[#4a4c4e] transition-colors duration-300 z-30 h-full lg:px-3 px-1 flex justify-start items-center cursor-pointer group"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)' }}
                >
                    <div className="flex justify-center items-center p-2 bg-[#1c1e21] hover:bg-[#4a4c4e] rounded-full transition duration-500 ease-in-out transform group-hover:translate-x-2">
                        <ChevronRight size={isMobile ? 20: 30} className="text-white" />
                    </div>
                </div>
            )}
        </div>
    );
};
