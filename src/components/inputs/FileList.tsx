import { Cross } from 'akar-icons';
import { Dispatch, FC } from 'react';
import { MdLibraryAdd } from 'react-icons/md';
import { RiFileList2Fill } from 'react-icons/ri';

type ImageListProps = {
    fileList: File[];
    setFileList: Dispatch<React.SetStateAction<File[]>>;
    handleGetFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FileList: FC<ImageListProps> = ({ fileList, setFileList, handleGetFile }) => {
    return (
        <>
            <label className="w-12 h-12 bg-[#1c1e21] rounded-xl flex justify-center items-center cursor-pointer hover:bg-[#303234] ">
                <MdLibraryAdd size={30} />
                <input onChange={handleGetFile} name="file" type="file" id="formId" className="hidden" multiple />
            </label>
            <div className="flex flex-wrap gap-2 justify-start animate-fade-in">
                {fileList.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 ">
                        <div className="w-32 h-12 bg-[#1c1e21] rounded-xl relative flex items-center">
                            <div className=" flex items-center px-2 gap-2">
                                <div className="p-[6px] rounded-full bg-[#585b60]">
                                    <RiFileList2Fill size={18} className="text-[#393a3b]" />
                                </div>
                                <div className="flex flex-col justiffy-center">
                                    <span className="text-sm">{file.name.slice(0, 5)}</span>
                                    {file.name.length > 5 ? (
                                        <span className="text-sm">
                                            {file.name.length > 10
                                                ? file.name.slice(5, 10) + '...'
                                                : file.name.slice(10)}
                                        </span>
                                    ) : null}
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
