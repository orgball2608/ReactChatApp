import {FC} from "react";
import {MessageType} from "../../utils/types";
import {MessagePanelHeader} from "./MessagePanelHeader";
import {MessageContainer} from "./MessageContainer";
import {MessagePanelBody} from "./MessagePanelBody";
import {MessageInputField} from "./MessageInputField";


type Props = {
    messages: MessageType[];
}
export const MessagePanel: FC<Props> = ({ messages }) => {
    return (
       <div className="bg-inherit h-full box-border relative">
           <MessagePanelHeader />
           <MessagePanelBody>
               <MessageContainer messages={messages} />
               <MessageInputField />
           </MessagePanelBody>
       </div>
    );
};