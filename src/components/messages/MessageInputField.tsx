import React, { Dispatch, FC, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { selectType } from '../../store/typeSlice';
import { User } from '../../utils/types';
import { useParams } from 'react-router-dom';

type Props = {
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
    sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
    sendTypingStatus: () => void;
    recipient: User | undefined;
};
export const MessageInputField: FC<Props> = ({ content, setContent, sendMessage, sendTypingStatus, recipient }) => {
    const conversationType = useSelector((state: RootState) => selectType(state));
    const { id } = useParams();
    const group = useSelector((state: RootState) => state.group.groups);
    const selectedGroup = group.find((group) => group.id === parseInt(id!));
    return (
        <div className="w-full box-border bg-message-form rounded-md px-8 py-3 mt-2">
            <form onSubmit={sendMessage} className="w-full">
                <input
                    type="text"
                    className="bg-inherit outline-0 border-0 text-[#454545] font-Inter box-border text-lg w-full p-0 resize-none"
                    value={content}
                    placeholder={`Send message to ${
                        conversationType === 'group' ? selectedGroup?.title || 'Group' : recipient?.firstName || 'User'
                    }`}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={sendTypingStatus}
                />
            </form>
        </div>
    );
};
