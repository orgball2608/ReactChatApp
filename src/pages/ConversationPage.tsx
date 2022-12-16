import { Outlet, useParams } from 'react-router-dom';
import {ConversationPanel} from "../components/conversations/ConversationPanel"
import {ConversationSidebar} from "../components/conversations/ConversationSideBar"

export const ConversationPage = () => {
    const {id} = useParams()
    return (
        <div className="bg-dark-light h-full">
            <ConversationSidebar/>
            {
                !id && <ConversationPanel/>
            }
            <Outlet/>
        </div>

    );
};