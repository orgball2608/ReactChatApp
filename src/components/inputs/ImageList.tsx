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
            <label className="w-12 h-12 bg-[#1c1e21] rounded-md flex justify-center items-center cursor-pointer ">
                <MdLibraryAdd size={30} />
                <input onChange={handleGetFile} name="file" type="file" id="formId" className="hidden" multiple />
            </label>
            <div className="flex flex-wrap gap-2 justify-start">
                {fileList.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 ">
                        <div className="w-12 h-12 bg-[#1c1e21] rounded-md relative">
                            <img src={URL.createObjectURL(file)} alt="attachments" className="w-12 h-12 rounded-md" />
                            <div
                                onClick={() => setFileList((prev) => prev.filter((f) => f !== file))}
                                className="p-[1px] bg-white absolute top-0 right-0 rounded-full cursor-pointer "
                            >
                                <Cross size={14} className="text-dark-light" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
