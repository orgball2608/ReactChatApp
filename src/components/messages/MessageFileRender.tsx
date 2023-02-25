import { FC } from 'react';
import { AttachmentType, GroupMessageType, MessageType } from '../../utils/types';
import FileIcon from '../icons/FileIcon';
import { HiDownload } from 'react-icons/hi';
import { CDN_URL } from '../../utils/constants';
import { getFileSize } from '../../utils/helpers';
type Props = {
    attachments: AttachmentType[];
    message: MessageType | GroupMessageType;
};

export const MessageFileRender: FC<Props> = ({ attachments, message }) => {
    return (
        <div
            id={'message-' + message.id}
            className="flex bg-[#3a3b3c] w-fit rounded-xl px-5 py-2 items-center gap-2  overflow-hidden"
        >
            <div className="p-1 rounded-full bg-[#727070]">
                <FileIcon color="#050505" />
            </div>
            <div className="flex  flex-col justify-center items-start gap-1">
                <p className="text-[#e6e6e6] text-base font-semibold leading-5 max-w-[160px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {attachments[0]?.name || 'File'}
                </p>
                {attachments[0]?.size && (
                    <p className="text-[#b3b3b3] text-sm leading-5">{getFileSize(attachments[0]?.size)}</p>
                )}
            </div>
            <a
                href={`${CDN_URL + attachments[0].key}`}
                download
                target="blank"
                rel="noopener noreferrer"
                className="p-1 rounded-full hover:bg-[#5a5757]"
            >
                <HiDownload size={24} />
            </a>
        </div>
    );
};
