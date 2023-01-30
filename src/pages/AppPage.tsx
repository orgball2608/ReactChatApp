import { UserSideBar } from '../components/sidebars/UserSideBar';
import { Outlet } from 'react-router-dom';
import { ConversationSidebar } from '../components/sidebars/ConversationSideBar';
import { ConversationSettingSideBar } from '../components/sidebars/ConversationSettingSideBar';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const AppPage = () => {
    const showSidebar = useSelector((state: RootState) => state.settingSidebar.showSidebar);
    return (
        <div className="h-full flex flex-nowrap">
            <UserSideBar />
            <ConversationSidebar />
            <Outlet />
            {showSidebar && <ConversationSettingSideBar />}
        </div>
    );
};
