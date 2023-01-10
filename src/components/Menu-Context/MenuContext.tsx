import { Dispatch, FC, SetStateAction, useContext } from 'react';
import { MessageMenuContext } from '../../contex/MessageMenuContext';
import { AuthContext } from '../../contex/AuthContext';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { deleteMessageThunk } from '../../store/messageSlice';

type Props = {
    points: { x: number; y: number };
    setShowMenu: Dispatch<SetStateAction<boolean>>;
};
export const MenuContext: FC<Props> = ({ points, setShowMenu }) => {
    const { x, y } = points;
    const styleMenu = {
        left: x,
        top: y,
    };
    const { message } = useContext(MessageMenuContext);
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const handleDeleteMessage = () => {
        const conversationId = parseInt(id!);
        console.log(`Delete message ${message?.id}`);
        if (!message) return;
        setShowMenu(false);
        dispatch(deleteMessageThunk({ conversationId, messageId: message.id }));
    };
    return (
        <div className={`bg-[#252525] box-border w-20 fixed z-10 px-3 rounded-md`} style={styleMenu}>
            <ul className="list-none m-0">
                {message?.author.id === user?.id && (
                    <li onClick={handleDeleteMessage} className="px-3 py-1 hover:cursor-pointer rounded-md">
                        Delete
                    </li>
                )}
                {message?.author.id === user?.id && <li className="px-3 py-1 hover:cursor-pointer rounded-md">Edit</li>}
            </ul>
        </div>
    );
};
