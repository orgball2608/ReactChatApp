import { ChevronDown, ChevronRight, File } from 'akar-icons';
import { Dispatch, FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Props = {
    setShowFileSideBar: Dispatch<React.SetStateAction<boolean>>;
};

export const MediaListFile: FC<Props> = ({ setShowFileSideBar }) => {
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
        <div className="flex flex-col justify-center ml-2 cursor-pointer font-medium">
            <div
                onClick={handleShowCustomizeConversation}
                className="text-lg flex items-center justify-between font-medium py-2 px-2 my-1 hover:bg-[#1c1e21] rounded-md "
            >
                <span className="font-semibold">File Media</span>
                <div className="px-1">{showFileMedia ? <ChevronDown size={20} /> : <ChevronRight size={20} />}</div>
            </div>
            {showFileMedia && (
                <div className="flex flex-col justify-center gap-2 overflow-y-scroll scrollbar-hide overflow-auto">
                    <div
                        onClick={() => setShowFileSideBar(true)}
                        className="flex justify-start gap-2 items-center rounded-md px-2 py-2 hover:bg-[#1c1e21]"
                    >
                        <div className="p-2 rounded-full text-white bg-[#373434]">
                            <File size={18} />
                        </div>
                        <span className="text-lg">File Medida</span>
                    </div>
                </div>
            )}
        </div>
    );
};
