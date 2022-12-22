import {MessageType} from "../../utils/types";
import {FC, useContext, useEffect} from "react";
import {AuthContext} from "../../contex/AuthContext";
import {FormattedMessage} from "./FormatMessage";

type Props = {
    messages: MessageType[];
}
export const MessageContainer:FC<Props> = ({messages}) => {
    const { user } = useContext(AuthContext);
    const formatMessages = () => {
        return messages.map((m, index, arr) => {
            const currentMessage = arr[index];
            const nextMessage = arr[index + 1];
            if (arr.length === index + 1) {
                return <FormattedMessage user={user} message={m} />;
            }
            if (currentMessage.author.id === nextMessage.author.id) {
                return (
                    <div className="flex gap-5 items-center py-1">
                        <div className="p-0">
                            {m.content}
                        </div>
                    </div>
                );
            }
            return <FormattedMessage user={user} message={m} />;
        });
    };

    useEffect(() => {
        formatMessages();
    });

    return <div className="h-full box-border py-3 flex flex-col-reverse overflow-y-scroll scrollbar-hide overflow-auto">{formatMessages()}</div>;
}