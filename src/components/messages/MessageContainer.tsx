import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contex/AuthContext';
import { FormattedMessage } from './FormatMessage';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useParams } from 'react-router-dom';

export const MessageContainer = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const conversationMessages = useSelector((state: RootState) => state.messages.messages);

    const formatMessages = () => {
        const msgs = conversationMessages.find((cm) => cm.id === parseInt(id!));
        if (!msgs) return [];
        return msgs.messages.map((m, index, arr) => {
            const currentMessage = arr[index];
            const nextMessage = arr[index + 1];
            if (arr.length === index + 1) {
                return <FormattedMessage user={user} message={m} key={m.id} />;
            }
            if (currentMessage.author.id === nextMessage.author.id) {
                return (
                    <div className="flex gap-4 items-center break-all" key={m.id}>
                        <div className="p-0 pl-14 text-base">{m.content}</div>
                    </div>
                );
            }
            return <FormattedMessage user={user} message={m} key={m.id} />;
        });
    };

    useEffect(() => {
        formatMessages();
    });

    return (
        <div className="h-full box-border py-2 flex flex-col-reverse overflow-y-scroll scrollbar-hide overflow-auto">
            {formatMessages()}
        </div>
    );
};
