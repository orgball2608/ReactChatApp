import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { FriendPageHeader } from '../../components/friends/FriendPageHeader';
import { FriendPanel } from '../../components/friends/FriendPanel';
import { FriendSideBar } from '../../components/sidebars/FriendSideBar';
import { AppDispatch } from '../../store';
import { fetchConversationsThunk } from '../../store/coversationSlice';

export const FriendPageLayout = () => {
    const { id } = useParams<{ id: string }>();
    const [selectedItem, setSelectedItem] = useState<string>('friends');
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchConversationsThunk());
    }, []);
    return (
        <div className="flex flex-col bg-dark-light h-full w-full overflow-hidden">
            <FriendPageHeader selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            <div className="flex h-full w-full">
                <FriendSideBar selectedItem={selectedItem} />
                {!id && <FriendPanel />}
                <Outlet />
            </div>
        </div>
    );
};
