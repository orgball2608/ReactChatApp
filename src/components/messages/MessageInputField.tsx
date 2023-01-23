import React, { Dispatch, FC, SetStateAction } from 'react';

type Props = {
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
    sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
    sendTypingStatus: () => void;
};
export const MessageInputField: FC<Props> = ({ content, setContent, sendMessage, sendTypingStatus }) => {
    return (
        <div className="w-full box-border bg-message-form rounded-md px-8 py-3 mt-2">
            <form onSubmit={sendMessage} className="w-full">
                <input
                    type="text"
                    className="bg-inherit outline-0 border-0 text-[#454545] font-Inter box-border text-lg w-full p-0 resize-none"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={sendTypingStatus}
                />
            </form>
        </div>
    );
};
