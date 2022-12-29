import React from 'react';

export const CreateConversationForm = () => {
    return (
        <form className="w-full">
            <section>
                <div className="bg-conversation-form py-2 px-4 rounded-[10px] w-full border-box my-2">
                    <label htmlFor="email" className="block text-label-white text-sm px-4">
                        Recipient
                    </label>
                    <textarea
                        id="message"
                        className="text-lg w-full border-box p-0 text-white bg-inherit border-0 outline-0 scrollbar-hide overflow-auto resize-none"
                    />
                </div>
            </section>

            <section className="my-3">
                <div className="bg-conversation-form py-2 px-4 rounded-[10px] w-full border-box my-2">
                    <label htmlFor="message" className="block text-label-white text-sm px-4">
                        Message (optional)
                    </label>
                    <textarea
                        id="message"
                        className="text-lg w-full border-box p-0 text-white bg-inherit border-0 outline-0 scrollbar-hide overflow-auto resize-none"
                    />
                </div>
            </section>

            <button
                className="w-full outline-0 border-0 text-xl bg-blue-button text-white rounded-[10px] py-3 mt-2"
                onClick={(e) => {
                    e.preventDefault();
                }}
            >
                Create Conversation
            </button>
        </form>
    );
};
