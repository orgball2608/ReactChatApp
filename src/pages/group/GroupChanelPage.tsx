import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MessagePanel } from '../../components/messages/MessagePanel';
import { SocketContext } from '../../contex/SocketContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { loadMoreGroupMessagesThunk, resetGroupMessages } from '../../store/groupMessageSlice';
import { GroupSettingSideBar } from '../../components/sidebars/GroupSettingSideBar';

export const GroupChannelPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const socket = useContext(SocketContext);
    const showSidebar = useSelector((state: RootState) => state.settingSidebar.showSidebar);

    useEffect(() => {
        dispatch(resetGroupMessages());
        const groupId = parseInt(id!);
        dispatch(loadMoreGroupMessagesThunk({ id: groupId, limit: 10, offset: 0 }));
    }, [id]);

    useEffect(() => {
        const groupId = id!;
        socket.emit('onGroupJoin', { groupId });
        return () => {
            socket.emit('onGroupLeave', { groupId });
        };
    }, [id]);

    return (
        <>
            <div className={`h-full w-full flex`}>
                <MessagePanel />
                {showSidebar && <GroupSettingSideBar />}
            </div>
        </>
    );
};
