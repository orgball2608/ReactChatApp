import { MessageType } from '../../utils/types';
import { FC, useContext, useEffect } from 'react';
import { AuthContext } from '../../contex/AuthContext';
import { FormattedMessage } from './FormatMessage';

type Props = {
    messages: MessageType[];
};
export const MessageContainer: FC<Props> = ({ messages }) => {
    const { user } = useContext(AuthContext);
    const formatMessages = () => {
        return messages.map((m, index, arr) => {
            const currentMessage = arr[index];
            const nextMessage = arr[index + 1];
            if (arr.length === index + 1) {
                return <FormattedMessage user={user} message={m} key={m.id} />;
            }
            if (currentMessage.author.id === nextMessage.author.id) {
                return (
                    <div className="flex gap-4 items-center " key={m.id}>
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
