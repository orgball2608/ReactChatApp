import React from "react";

export const CreateConversationForm = () => {
    return (
        <form className="w-full">
            <section>
                <div className="bg-conversation-form py-3 px-4 rounded-[10px] w-full border-box my-2">
                    <label htmlFor="email" className="block text-label-white text-[16px] px-[14px]">Recipient</label>
                    <textarea id="message"
                              className="text-[18px] w-full border-box p-0 my-1 text-white bg-inherit border-0 outline-0 scrollbar-hide overflow-auto resize-none" />
                </div>
            </section>

            <section className="my-2">
                <div className="bg-conversation-form py-3 px-4 rounded-[10px] w-full border-box my-2">
                    <label htmlFor="message" className="block text-label-white text-[16px] px-[14px]">Message (optional)</label>
                    <textarea id="message"
                                className="text-[18px] w-full border-box p-0 my-1 text-white bg-inherit border-0 outline-0 scrollbar-hide overflow-auto resize-none" />
                </div>
            </section>

            <button className="w-full outline-0 border-0 text-[20px] bg-blue-button text-white rounded-[10px] py-4" onClick={(e) => e.preventDefault()} >
                Create Conversation
            </button>


        </form>
    )
}