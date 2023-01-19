import React, { FC } from 'react';
import { Dispatch } from 'react';
import { useForm } from 'react-hook-form';
import { CreateConversationParams } from '../../utils/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { createConversationThunk } from '../../store/coversationSlice';
import { useNavigate } from 'react-router-dom';

type Props = {
    setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

export const CreateConversationForm: FC<Props> = ({ setShowModal }) => {
    const { register, handleSubmit } = useForm<CreateConversationParams>({});
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const onSubmit = (data: CreateConversationParams) => {
        dispatch(createConversationThunk(data))
            .unwrap()
            .then(({ data }) => {
                setShowModal(false);
                navigate(`/conversations/${data.id}`);
            })
            .catch((err) => console.log(err));
    };
    return (
        <form className="w-full flex justify-center flex-col" onSubmit={handleSubmit(onSubmit)}>
            <section>
                <div className="bg-conversation-form py-2 px-4 rounded-[10px] w-full border-box my-1">
                    <label htmlFor="email" className="block text-label-white text-sm px-4">
                        Recipient
                    </label>
                    <textarea
                        id="email"
                        className="text-lg w-full border-box p-0 text-white bg-inherit border-0 outline-0 scrollbar-hide overflow-auto resize-none"
                        {...register('email', { required: 'Email is required' })}
                    />
                </div>
            </section>

            <section className="my-3">
                <div className="bg-conversation-form py-2 px-4 rounded-[10px] w-full border-box my-1">
                    <label htmlFor="message" className="block text-label-white text-sm px-4">
                        Message (optional)
                    </label>
                    <textarea
                        id="message"
                        className="text-lg w-full border-box p-0 text-white bg-inherit border-0 outline-0 scrollbar-hide overflow-auto resize-none"
                        {...register('message', { required: 'Message is required' })}
                    />
                </div>
            </section>

            <button className=" outline-0 border-0 text-xl bg-blue-button text-white rounded-[10px] py-3 mt-2">
                Create Conversation
            </button>
        </form>
    );
};
