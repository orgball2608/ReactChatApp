import { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { FriendPageHeader } from '../../components/friends/FriendPageHeader';
import { FriendPanel } from '../../components/friends/FriendPanel';
import { FriendSideBar } from '../../components/sidebars/FriendSideBar';
import { useCurrentViewportView } from '../../hooks/useCurrentViewportView';

export const FriendPageLayout = () => {
    const { id } = useParams<{ id: string }>();
    const [selectedItem, setSelectedItem] = useState<string>('friends');
    const { isMobile,isTablet } = useCurrentViewportView();
    return (
        <div className="flex bg-dark-light h-full w-full overflow-hidden">
            {
                !((isMobile && id)||(isTablet&& id)) && <div className={`flex-none w-80 flex flex-col ${isMobile?'!w-full':''}`}>
                    <FriendPageHeader selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
                    <FriendSideBar selectedItem={selectedItem} />
                </div>
            }
            <div className="flex h-full w-full">
                {!id && !isMobile&& <FriendPanel />}
                <Outlet />
            </div>
        </div>
    );
};
