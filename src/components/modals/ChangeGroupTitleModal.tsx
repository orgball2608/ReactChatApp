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
            className="w-full h-full bg-overlay-background fixed flex justify-center items-center z-25"
        >
            <div className="bg-modal-background w-2/5 box-border rounded-xl">
                <div className=" box-border flex justify-between mx-6 items-center mt-6">
                    <h1 className="text-2xl font-bold">Change Group Title</h1>
                    <MdClose size={24} onClick={() => setShowModal(false)} />
                </div>
                <div className="px-6 pb-6 pt-2">
                    <span>Mọi người đều biết khi tên nhóm chat thay đổi.</span>
                    <div className="w-full flex justify-center flex-col relative">
                        <section className="my-3">
                            <div className="bg-conversation-form py-2 px-4 rounded-xl w-full border-box">
                                <label htmlFor="title" className="block text-label-white text-sm">
                                    Group Title
                                </label>
                                <input
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="text-lg w-full border-box p-0 text-white bg-inherit border-0 outline-0 scrollbar-hide overflow-auto resize-none"
                                />
                            </div>
                        </section>
                        <div className="flex w-full gap-2 justify-center items-center">
                            <button
                                onClick={handleCancelSubmitTitle}
                                className=" w-1/2 outline-0 border-0 text-xl bg-blue-button text-white rounded-xl py-2 mt-1"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitTitle}
                                disabled={selectedGroup?.title === title}
                                className="w-1/2 outline-0 border-0 text-xl bg-blue-button text-white rounded-xl py-2 mt-1 disabled:opacity-25"
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
