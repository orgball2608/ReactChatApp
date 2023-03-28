import { Cross } from 'akar-icons';
import React, { Dispatch, FC } from 'react';
import { MdLibraryAdd } from 'react-icons/md';
import { getFileSize } from '../../utils/helpers';
import FileIcon from '../icons/FileIcon';

type ImageListProps = {
    fileList: File[];
    setFileList: Dispatch<React.SetStateAction<File[]>>;
    handleGetFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FileList: FC<ImageListProps> = ({ fileList, setFileList, handleGetFile }) => {
    return (
        <>
            <label className="w-12 h-12 bg-[#2b2a2a] rounded-xl flex justify-center items-center cursor-pointer hover:bg-[#303234] ">
                <MdLibraryAdd size={30} />
                <input onChange={handleGetFile} name="file" type="file" id="formId" className="hidden" multiple />
            </label>
            <div className="flex gap-2 justify-start flex-nowrap animate-fade-in">
                {fileList.map((file, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="w-40 h-12 bg-[#2b2a2a] rounded-xl relative flex items-center">
                            <div className=" flex items-center px-2 gap-2">
                                <div className="p-1 rounded-full bg-[#585b60]">
                                    <FileIcon color="#050505" />
                                </div>
                                <div className="flex flex-col justify-center overflow-hidden w-24">
                                    <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium">{file.name}</span>
                                    <span className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-400">
                                        {getFileSize(file.size)}
                                    </span>
                                </div>
                            </div>
                            <div
                                onClick={() => setFileList((prev) => prev.filter((f) => f !== file))}
                                className="p-1 bg-white absolute -top-1 -right-1 rounded-full cursor-pointer shadow-[#65676b] leading-5 
                                fade-in 
                                "
                            >
                                <Cross size={12} className="text-[#65676b] font-bold" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
