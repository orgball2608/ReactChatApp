import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MessagePanel } from '../../components/messages/MessagePanel';
import { SocketContext } from '../../contex/SocketContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { resetGroupMessages } from '../../store/groupMessageSlice';
import { GroupSettingSideBar } from '../../components/sidebars/GroupSettingSideBar';
import { useCurrentViewportView } from '../../hooks/useCurrentViewportView';
import { hiddenSideBar } from '../../store/settingSidebarSlice';

export const GroupChannelPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const socket = useContext(SocketContext);
    const { width } = useCurrentViewportView();
    const showSidebar = useSelector((state: RootState) => state.settingSidebar.showSidebar);
    const groups = useSelector((state: RootState) => state.group.groups);
    const selectedGroup = groups.find((group) => group.id === parseInt(id!));

    useEffect(() => {
        dispatch(resetGroupMessages());
    }, [id]);

    useEffect(() => {
        if (selectedGroup?.theme)
            document.body.style.setProperty("--primary-color", selectedGroup.theme);
    }, [selectedGroup]);

    useEffect(() => {
        const groupId = id!;
        socket.emit('onGroupJoin', { groupId });
        return () => {
            socket.emit('onGroupLeave', { groupId });
        };
    }, [id]);

    useEffect(()=>{
        if(width<1023){
            dispatch(hiddenSideBar())
        }
    },[width,dispatch])

    return (
        <>
            <div className={`h-full w-full flex`}>
                <MessagePanel />
                {showSidebar && <GroupSettingSideBar />}
            </div>
        </>
    );
};
