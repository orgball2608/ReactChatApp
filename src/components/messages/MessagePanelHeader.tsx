import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useContext } from 'react';
import { AuthContext } from '../../contex/AuthContext';

export const MessagePanelHeader = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const conversations = useSelector((state: RootState) => state.conversation.conversations);
    const conversation = conversations.find((con) => con.id == parseInt(id!));
    const selectedType = useSelector((state: RootState) => state.type.type);
    const fullName =
        user?.id != conversation?.creator.id
            ? `${conversation?.creator.lastName} ${conversation?.creator.firstName}`
            : `${conversation?.recipient.lastName} ${conversation?.recipient.firstName}`;

    return (
        <header
            className="bg-dark-header border-b-[1px] border-solid border-border-conversations flex justify-between items-center px-8 box-border
    absolute top-0 left-0 w-full h-14 text-lg rounded z-8"
        >
            {selectedType === 'private' ? fullName : 'Group'}
        </header>
    );
};
