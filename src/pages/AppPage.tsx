import { UserSideBar } from '../components/sidebars/UserSideBar';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'tippy.js/dist/tippy.css';
import tippy from 'tippy.js';

export const AppPage = () => {
    return (
        <div className="h-full flex flex-nowrap">
            <UserSideBar />
            <Outlet />
            <ToastContainer />
        </div>
    );
};
