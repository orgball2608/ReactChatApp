import { Cross } from 'akar-icons';
import { Dispatch, FC } from 'react';
import { MdLibraryAdd } from 'react-icons/md';

type ImageListProps = {
    fileList: File[];
    setFileList: Dispatch<React.SetStateAction<File[]>>;
    handleGetFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ImageList: FC<ImageListProps> = ({ fileList, setFileList, handleGetFile }) => {
    return (
        <>
            <label className="w-12 h-12 bg-[#2b2a2a] rounded-md flex justify-center items-center cursor-pointer hover:bg-[#303234] ">
                <MdLibraryAdd size={30} />
                <input onChange={handleGetFile} name="file" type="file" id="formId" className="hidden" multiple />
            </label>
            <div className="flex flex-wrap gap-2 justify-start">
                {fileList.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 ">
                        <div className="w-12 h-12 bg-[#2b2a2a] rounded-md relative">
                            <img src={URL.createObjectURL(file)} alt="attachments" className="w-12 h-12 rounded-md object-cover" />
                            <div
                                onClick={() => setFileList((prev) => prev.filter((f) => f !== file))}
                                className="p-1 bg-white absolute -top-1 -right-1 rounded-full cursor-pointer shadow-[#65676b] leading-5 "
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
