import { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { FriendPageHeader } from '../../components/friends/FriendPageHeader';
import { FriendPanel } from '../../components/friends/FriendPanel';
import { FriendSideBar } from '../../components/sidebars/FriendSideBar';

export const FriendPageLayout = () => {
    const { id } = useParams<{ id: string }>();
    const [selectedItem, setSelectedItem] = useState<string>('friends');
    return (
        <div className="flex bg-dark-light h-full w-full overflow-hidden">
            <div className="flex-none w-88 flex flex-col">
                <FriendPageHeader selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
                <FriendSideBar selectedItem={selectedItem} />
            </div>

            <div className="flex h-full w-full">
                {!id && <FriendPanel />}
                <Outlet />
            </div>
        </div>
    );
};
