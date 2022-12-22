import {MessageType, User} from "../../utils/types";
import {FC} from "react";
import moment from "moment";

type FormattedMessageProps = {
    user?: User;
    message: MessageType;
};

export const FormattedMessage: FC<FormattedMessageProps> = ({user, message,}) => {
    return (
        <div className="flex gap-5 py-3 items-center">
            <div className="w-14 h-14 rounded-full bg-red-500"></div>
            <div className=" flex-col gap-3">
                <div className="flex gap-3 py-1">
                  <span
                      className="text-[#6d6d6d] text-base font-bold"
                      style={{
                          color: user?.id === message.author.id ? '#757575' : '#5E8BFF',
                      }}
                  >
                    {message.author.firstName} {message.author.lastName}
                  </span>
                    <span className="font-semi-bold">{moment(message.createdAt).fromNow()}</span>
                </div>
                <div className="text-lg" >{message.content}</div>
            </div>
        </div>
    );
};