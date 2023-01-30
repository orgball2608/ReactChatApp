import { UserSideBar } from '../components/sidebars/UserSideBar';
import { Outlet } from 'react-router-dom';
import { ConversationSidebar } from '../components/sidebars/ConversationSideBar';
import { ConversationSettingSideBar } from '../components/sidebars/ConversationSettingSideBar';

export const AppPage = () => {
    return (
        <div className="h-full flex flex-nowrap">
            <UserSideBar />
            <ConversationSidebar />
            <Outlet />
            <ConversationSettingSideBar />
        </div>
    );
};
