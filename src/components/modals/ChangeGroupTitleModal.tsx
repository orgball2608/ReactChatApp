import { MdClose } from 'react-icons/md';
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Group } from '../../utils/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { editGroupTitleThunk } from '../../store/groupSlice';
import { useParams } from 'react-router-dom';

type Props = {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    selectedGroup: Group | undefined;
};

export const ChangeGroupTitleModal: FC<Props> = ({ setShowModal, selectedGroup }) => {
    const [title, setTitle] = useState<string | undefined>('');
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams();

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
    return (
        <div
            onKeyDown={(e) => handleKeyDownSubmitTitle(e)}
            className="w-full h-full bg-overlay-background fixed left-0 top-0 flex justify-center items-center z-30 animate-fade-in"
        >
            <div className="bg-modal-background w-screen max-w-[550px] box-border rounded-lg  overflow-hidden h-fit min-w-screen flex flex-col gap-4">
                <div className=" box-border flex justify-center flex-shrink-0 items-center px-4 py-3 border-b-[1px] border-border-conversations ">
                    <div className="mr-auto invisible">
                        <MdClose size={24} className="bg-[#908f8f] cursor-pointer rounded-full" />
                    </div>
                    <span className="text-2xl leading-5">Change group title</span>
                    <div className="ml-auto bg-[#383636] hover:bg-[#494747] p-1 rounded-full">
                        <MdClose size={20} onClick={() => setShowModal(false)} className="cursor-pointer" />
                    </div>
                </div>
                <div className="px-6 pb-4 pt-2">
                    <span className='text-sm'>Everyone knows when to change the chat group name.</span>
                    <div className="w-full flex justify-center flex-col relative gap-2">
                        <section className="my-1">
                            <div className="bg-conversation-form py-3 px-4 rounded-xl w-full border-box">
                                <label htmlFor="title" className="block text-label-white text-xs">
                                    Title
                                </label>
                                <input
                                    id="title"
                                    value={title || ''}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="text-base w-full border-box p-0 text-white bg-inherit border-0 outline-0 scrollbar-hide overflow-auto resize-none"
                                />
                            </div>
                        </section>
                        <div className="flex w-full gap-2 justify-center items-center">
                            <button
                                onClick={handleCancelSubmitTitle}
                                className=" w-1/2 outline-0 border-0 text-lg hover:bg-[#1c1e20] text-white rounded-xl py-2 mt-1 transform active:scale-125 transition-all duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitTitle}
                                disabled={selectedGroup?.title === title}
                                className="w-1/2 outline-0 border-0 text-lg bg-[#0d90f3] text-white rounded-xl py-2 mt-1 disabled:opacity-75 transform active:scale-125 transition-all duration-300"
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
