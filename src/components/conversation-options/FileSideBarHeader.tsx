import { Dispatch, FC, useEffect, useState } from 'react';

type Props = {
    setShowMediaFileSideBar: Dispatch<React.SetStateAction<boolean>>;
    setShowFileSideBar: Dispatch<React.SetStateAction<boolean>>;
    showFileSideBar: boolean;
    showMediaFileSideBar: boolean;
};

export const FileSideBarHeader: FC<Props> = ({
    setShowFileSideBar,
    setShowMediaFileSideBar,
    showFileSideBar,
    showMediaFileSideBar,
}) => {
    return (
        <div className="flex items-center h-10 justify-center w-full text-lg font-semibold cursor-pointer mb-2">
            <div
                onClick={() => {
                    setShowMediaFileSideBar(true);
                    setShowFileSideBar(false);
                }}
                className={`basis-1/2 text-center py-2 rounded-lg  ${
                    showMediaFileSideBar && 'border-b-[3px] border-[#0099ff] text-[#0099ff] rounded-b-none '
                } hover:bg-[#1c1e21] `}
            >
                File Media
            </div>
            <div
                onClick={() => {
                    setShowFileSideBar(true);
                    setShowMediaFileSideBar(false);
                }}
                className={`basis-1/2 text-center py-2 rounded-lg  ${
                    showFileSideBar && 'border-b-[3px] border-[#0099ff] text-[#0099ff] rounded-b-none'
                } hover:bg-[#1c1e21]  `}
            >
                File
            </div>
        </div>
    );
};
