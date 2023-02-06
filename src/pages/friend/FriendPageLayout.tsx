import { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { FriendPageHeader } from '../../components/friends/FriendPageHeader';
import { FriendPanel } from '../../components/friends/FriendPanel';
import { FriendSideBar } from '../../components/sidebars/FriendSideBar';

export const FriendPageLayout = () => {
    const { id } = useParams<{ id: string }>();
    const [selectedItem, setSelectedItem] = useState<string>('friends');
    return (
        <div className="flex flex-col bg-dark-light h-full w-full">
            <FriendPageHeader selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            <div className="flex h-full w-full">
                <FriendSideBar selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
                {!id && <FriendPanel />}
                <Outlet />
            </div>
        </div>
    );
};
