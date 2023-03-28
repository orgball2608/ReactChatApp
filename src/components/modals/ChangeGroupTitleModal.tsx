import { MdClose } from 'react-icons/md';
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Group } from '../../utils/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { editGroupTitleThunk } from '../../store/groupSlice';
import { useParams } from 'react-router-dom';
import { useCurrentViewportView } from '../../hooks/useCurrentViewportView';

type Props = {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    selectedGroup: Group | undefined;
};

export const ChangeGroupTitleModal: FC<Props> = ({ setShowModal, selectedGroup }) => {
    const [title, setTitle] = useState<string | undefined>('');
    const dispatch = useDispatch<AppDispatch>();
    const { isMobile } = useCurrentViewportView();
    const { id } = useParams();
    const LENGTH_OF_TITLE = 100

    useEffect(() => {
        setTitle(selectedGroup?.title);
    }, []);

    const handleSubmitTitle = () => {
        const params = {
            id: parseInt(id!),
            title,
        };
        dispatch(editGroupTitleThunk(params))
            .then(() => setShowModal(false))
            .catch((err) => console.log(err));
    };
    const handleCancelSubmitTitle = () => {
        setShowModal(false);
    };

    const handleKeyDownSubmitTitle = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' && selectedGroup?.title !== title) handleSubmitTitle();
    };

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>)=>{
        if(!title || (title && title?.length < LENGTH_OF_TITLE)){
            setTitle(e.target.value)
        }
    }

    return (
        <div
            onKeyDown={(e) => handleKeyDownSubmitTitle(e)}
            className="w-full h-full bg-overlay-background fixed left-0 top-0 flex justify-center items-center z-50 animate-fade-in"
        >
            <div className={`bg-modal-background w-screen max-w-[550px] box-border rounded-lg  overflow-hidden h-fit min-w-screen flex flex-col gap-2 ${isMobile ?'mx-3':''}`}>
                <div className="box-border flex justify-center flex-shrink-0 items-center p-4 border-b-[1px] border-border-conversations">
                    <div className="mr-auto invisible">
                        <MdClose size={24} className="bg-[#908f8f] cursor-pointer rounded-full" />
                    </div>
                    <span className={`${isMobile ?'text-xl':'text-2xl'}`}>Change group title</span>
                    <div className="ml-auto bg-[#383636] hover:bg-[#494747] p-1 rounded-full">
                        <MdClose size={20} onClick={() => setShowModal(false)} className="cursor-pointer" />
                    </div>
                </div>
                <div className={`pb-2 pt-1 ${isMobile ?'px-2':'px-6'}`}>
                    <span className='text-sm ml-1'>Everyone knows when to change the chat group name.</span>
                    <div className="w-full flex justify-center flex-col relative gap-2">
                        <section className="my-1">
                            <div className="bg-conversation-form py-3 px-4 rounded-lg w-full border-box">
                                <label htmlFor="title" className="block text-label-white text-xs relative">
                                    Title Of Group
                                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                                        {title?.length+`/${LENGTH_OF_TITLE}`}
                                    </div>
                                </label>
                                <input
                                    id="title"
                                    value={title || ''}
                                    onChange={(e) => handleChangeTitle(e)}
                                    className="text-lg w-full border-box p-0 text-white bg-inherit border-0 outline-0 scrollbar-hide overflow-auto resize-none"
                                />
                            </div>
                        </section>
                        <div className="flex w-full pb-2 gap-2 justify-center items-center">
                            <button
                                onClick={handleCancelSubmitTitle}
                                className=" w-1/2 border-0 text-base font-medium py-[6px] hover:bg-[#1c1e20] text-white rounded-md mt-1 transform active:scale-125 transition-all duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitTitle}
                                disabled={selectedGroup?.title === title}
                                className={`w-1/2 border-0 text-base py-[6px] font-medium bg-[#0084ff] text-white rounded-md  mt-1 disabled:opacity-75 transform active:scale-125 transition-all duration-300 ${selectedGroup?.title === title && 'cursor-not-allowed'}`}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
