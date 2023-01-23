import { ConversationSidebar } from '../components/sidebars/ConversationSideBar';
import { UserSideBar } from '../components/sidebars/UserSideBar';
import { Outlet } from 'react-router-dom';

export const AppPage = () => {
    return (
        <div className="h-full">
            <UserSideBar />
            <ConversationSidebar />
            <Outlet />
        </div>
    );
};
