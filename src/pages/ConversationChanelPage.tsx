import {ConversationPanel} from "../components/conversations/ConversationPanel"
import {ConversationSidebar} from "../components/conversations/ConversationSideBar"

export const  ConversationChannelPage = () =>
{
    return (
        <div className="h-full ml-[400px]">
            <ConversationSidebar/>
            <ConversationPanel/>
        </div>
    )

}