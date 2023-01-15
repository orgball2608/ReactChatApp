import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contex/AuthContext';
import { FormattedMessage } from './FormatMessage';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useParams } from 'react-router-dom';
import { FiMoreVertical } from 'react-icons/fi';
import { MessageType } from '../../utils/types';
import { MessageMenuContext } from '../../contex/MessageMenuContext';
import { MenuContext } from '../menu-Context/MenuContext';

export const MessageContainer = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [showMenu, setShowMenu] = useState(false);
    const [points, setPoints] = useState({ x: 0, y: 0 });
    const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(null);
    const conversationMessages = useSelector((state: RootState) => state.messages.messages);

    const handleOnScroll = () => {
        setShowMenu(false);
    };

    const handleOnClick = () => {
        if (points.x > 0 && points.y > 0) {
            setPoints({ x: 0, y: 0 });
            console.log('close');
            setShowMenu(false);
        }
    };

    const handleShowMenu = (e: React.MouseEvent<SVGElement>, message: MessageType) => {
        e.preventDefault();
        console.log('show');
        setShowMenu(true);
        setPoints({ x: e.pageX, y: e.pageY });
        setSelectedMessage(message);
    };
    const formatMessages = () => {
        const msgs = conversationMessages.find((cm) => cm.id === parseInt(id!));
        if (!msgs) return [];
        return msgs.messages.map((m, index, arr) => {
            const currentMessage = arr[index];
            const nextMessage = arr[index + 1];
            if (arr.length === index + 1) {
                return <FormattedMessage user={user} message={m} key={m.id} handleShowMenu={handleShowMenu} />;
            }
            if (currentMessage.author.id === nextMessage.author.id) {
                return (
                    <div className="flex gap-4 items-center break-all" key={m.id}>
                        <div className="p-0 pl-14 text-base flex justify-start items-center">
                            <div>{m.content}</div>
                            <FiMoreVertical size={14} className="ml-1" onClick={(e) => handleShowMenu(e, m)} />
                        </div>
                    </div>
                );
            }

            return <FormattedMessage user={user} message={m} key={m.id} handleShowMenu={handleShowMenu} />;
        });
    };

    return (
        <MessageMenuContext.Provider value={{ message: selectedMessage, setMessage: setSelectedMessage }}>
            <div
                className="h-full box-border py-2 mt-8 flex flex-col-reverse overflow-y-scroll scrollbar-hide overflow-auto relative"
                onScroll={handleOnScroll}
                onClick={handleOnClick}
            >
                <>{formatMessages()}</>
                {showMenu && <MenuContext points={points} setShowMenu={setShowMenu} />}
            </div>
        </MessageMenuContext.Provider>
    );
};
