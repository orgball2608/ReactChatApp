import { FC } from 'react';
import { AttachmentType } from '../../utils/types';
import FileIcon from '../icons/FileIcon';
import { HiDownload } from 'react-icons/hi';
import { CDN_URL } from '../../utils/constants';
import { getFileSize } from '../../utils/helpers';
type Props = {
    attachments: AttachmentType[];
};

export const MessageFileRender: FC<Props> = ({ attachments }) => {
    const getFileName = (name: string) => {
        if (name && name.length > 30) {
            return name.slice(0, 30) + '...';
        }
        return name;
    };
    return (
        <div className="flex bg-[#464648] w-fit rounded-xl px-5 py-2 items-center gap-2">
            <div className="p-1 rounded-full bg-[#727070]">
                <FileIcon />
            </div>
            <div className="flex  flex-col justify-center items-start">
                <p className="text-[#e6e6e6] text-base font-semibold leading-5">
                    {getFileName(attachments[0]?.name) || 'File'}
                </p>
                {attachments[0]?.size && (
                    <p className="text-[#b3b3b3] text-sm font-semibold leading-5">
                        {getFileSize(attachments[0]?.size)}
                    </p>
                )}
            </div>
            <a
                href={`${CDN_URL + attachments[0].key}`}
                download
                target="blank"
                rel="noopener noreferrer"
                className="p-1 rounded-full hover:bg-[#5a5757]"
            >
                <HiDownload size={20} />
            </a>
        </div>
    );
};
