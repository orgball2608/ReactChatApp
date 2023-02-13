import { ChevronLeft, ChevronRight, Cross } from 'akar-icons';
import React from 'react';
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ImagePreviewModalContext } from '../../contex/ImagePreviewModalContext';
import { RootState } from '../../store';
import { CDN_ORIGINAL_URL } from '../../utils/constants';
import { AttachmentType } from '../../utils/types';

export const ImagePreviewModal = () => {
    const { setShowModal, attachment } = useContext(ImagePreviewModalContext);
    const [currentAttachment, setCurrentAttachment] = useState<AttachmentType | undefined>(attachment);
    const { id } = useParams();
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
            // style={{ backgroundImage: `url(${CDN_ORIGINAL_URL + attachment?.key})` }}
            className="w-full h-full fixed left-0 top-0 flex flex-col justify-center items-start z-50 bg-cover bg-modal-background"
            tabIndex={-1}
            onKeyDown={handleKeyDown}
        >
            <div
                onClick={() => setShowModal(false)}
                className="flex justify-center items-center cursor-pointer absolute top-4 left-4 p-2 rounded-full bg-white z-30"
            >
                <Cross size={20} className="text-dark-light" />
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
                    className="absolute top-0 left-0 h-full px-3 bg-[#1c1e21] flex justify-center items-center cursor-pointer"
                >
                    <div className="flex justify-center items-center p-1 bg-white rounded-full ">
                        <ChevronLeft size={30} className="text-dark-light" />
                    </div>
                </div>
            )}
            {nextIndex >= attachments.length ? null : (
                <div
                    onClick={() => setCurrentAttachment(nextAttachment)}
                    className="absolute top-0 right-0 h-full px-3 bg-[#1c1e21] flex justify-center items-center cursor-pointer "
                >
                    <div className="flex justify-center items-center p-1 bg-white rounded-full cursor-pointer ">
                        <ChevronRight size={30} className="text-dark-light" />
                    </div>
                </div>
            )}
        </div>
    );
};
