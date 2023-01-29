import { UserSideBar } from '../components/sidebars/UserSideBar';
import { Outlet } from 'react-router-dom';

export const AppPage = () => {
    return (
        <div className="h-full flex flex-nowrap">
            <UserSideBar />
            <Outlet />
        </div>
    );
};
