import { FC } from 'react';
import { GroupMessageType, MessageType } from '../../utils/types';

type MessageReplyBadgeProps = {
    message: MessageType | GroupMessageType;
};

export const MessageReplyBadge: FC<MessageReplyBadgeProps> = ({ message }) => {
    return (
        <div
            onClick={() => {
                const el = document.querySelector<HTMLElement>(`#message-${message.id}`);
                if (el) {
                    const selected = document.querySelector<HTMLElement>('.select-message');
                    if (selected) {
                        selected.style.border = 'none';
                        selected.classList.remove('select-message');
                    }
                    el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                    el.style.border = '2px solid #4E4F50';
                    el.classList.add('select-message');
                }
            }}
            className="bg-[#4E4F50] opacity-60 rounded-xl px-5 py-2 cursor-pointer"
        >
            {message.content ? (
                <p>{message.content}</p>
            ) : message.attachments && message.attachments.length > 0 ? (
                <p>Attachment</p>
            ) : message.gif ? (
                <p>Gif</p>
            ) : message.sticker ? (
                <p>Sticker</p>
            ) : null}
        </div>
    );
};
