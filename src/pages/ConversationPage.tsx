import { Outlet, useParams } from 'react-router-dom';
import {ConversationPanel} from "../components/conversations/ConversationPanel"
import {ConversationSidebar} from "../components/conversations/ConversationSideBar"
import mockConversations from '../__mocks__/conversations';
export const ConversationPage = () => {
    const {id} = useParams()
    return (
        <div className="bg-dark-light h-full">
            <ConversationSidebar conversations = {mockConversations}/>
            {
                !id && <ConversationPanel/>
            }
            <Outlet/>
        </div>

    );
};