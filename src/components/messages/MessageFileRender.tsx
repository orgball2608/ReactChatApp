import { FC } from 'react';
import { AttachmentType } from '../../utils/types';
import FileIcon from '../icons/FileIcon';
import { HiDownload } from 'react-icons/hi';
import { CDN_URL } from '../../utils/constants';
type Props = {
    attachments: AttachmentType[];
};

export const MessageFileRender: FC<Props> = ({ attachments }) => {
    return (
        <div className="flex bg-[#464648] w-fit rounded-xl px-5 py-2 items-center gap-2">
            <div className="p-1 rounded-full bg-[#727070]">
                <FileIcon />
            </div>
            <p className="text-[#e6e6e6] text-sm font-semibold">File</p>
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
