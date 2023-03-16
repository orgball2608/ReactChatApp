import { ChevronDown, ChevronRight } from 'akar-icons';
import { Dispatch, FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FileIcon from '../icons/FileIcon';
import FileMediaIcon from '../icons/FileMediaIcon';

type Props = {
    setShowMediaFileSideBar: Dispatch<React.SetStateAction<boolean>>;
    setShowFileSideBar: Dispatch<React.SetStateAction<boolean>>;
};

export const MediaListFile: FC<Props> = ({ setShowMediaFileSideBar, setShowFileSideBar }) => {
    const { id } = useParams();
    const conversationId = parseInt(id!);
    const [showFileMedia, setShowFileMedia] = useState<boolean>(false);
    useEffect(() => {
        setShowFileMedia(false);
    }, [conversationId]);

    const handleShowCustomizeConversation = () => {
        if (showFileMedia) setShowFileMedia(false);
        else setShowFileMedia(true);
    };

    return (
        <div className="flex flex-col justify-center ml-2 cursor-pointer font-normal">
            <div
                onClick={handleShowCustomizeConversation}
                className="flex items-center justify-between py-2 px-2 hover:bg-[#1c1e21] rounded-md "
            >
                <span className="text-base text-white font-medium text-[#fcfcfc]">File Media</span>
                <div className="px-1">{showFileMedia ?  <ChevronDown size={16} /> : <ChevronRight size={16} />}</div>
            </div>
            {showFileMedia && (
                <div className="flex flex-col justify-center overflow-y-scroll scrollbar-hide overflow-auto">
                    <div
                        onClick={() => setShowMediaFileSideBar(true)}
                        className="flex justify-start gap-2 items-center rounded-md px-2 py-2 hover:bg-[#1c1e21]"
                    >
                        <div className="p-1 w-fit h-fit rounded-full text-white bg-[#373434]">
                            <FileMediaIcon className="w-6 h-6" />
                        </div>
                        <span className="text-base">File Media</span>
                    </div>
                    <div
                        onClick={() => setShowFileSideBar(true)}
                        className="flex justify-start gap-2 items-center rounded-md px-2 py-2 hover:bg-[#1c1e21]"
                    >
                        <div className="p-1 w-fit h-fit rounded-full text-white bg-[#373434]">
                            <FileIcon className="w-6 h-6" color="#ffffff" />
                        </div>
                        <span className="text-base">File</span>
                    </div>
                </div>
            )}
        </div>
    );
};
