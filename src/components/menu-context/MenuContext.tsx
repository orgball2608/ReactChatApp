import { Dispatch, FC, SetStateAction, useContext } from 'react';
import { MessageMenuContext } from '../../contex/MessageMenuContext';
import { AuthContext } from '../../contex/AuthContext';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { deleteMessageThunk } from '../../store/messageSlice';
import { selectType } from '../../store/typeSlice';
import { deleteGroupMessageThunk } from '../../store/groupMessageSlice';
import { updateDeleteMessage } from '../../store/coversationSlice';
import { updateGroupDeleteMessage } from '../../store/groupSlice';

type Props = {
    points: { x: number; y: number };
    setShowMenu: Dispatch<SetStateAction<boolean>>;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
};
export const MenuContext: FC<Props> = ({ points, setShowMenu, setIsEditing }) => {
    const { x, y } = points;
    const styleMenu = {
        left: x,
        top: y,
    };
    const { message, setEditMessage } = useContext(MessageMenuContext);
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const conMessages = useSelector((state: RootState) => state.messages.messages);
    const conversationType = useSelector((state: RootState) => selectType(state));
    const selectedMessage = conMessages.find((con) => con.id === parseInt(id!));
    const handleDeleteMessage = () => {
        const Id = parseInt(id!);
        if (!message) return;
        setShowMenu(false);
        if (conversationType === 'private') {
            dispatch(deleteMessageThunk({ conversationId: Id, messageId: message.id }))
                .unwrap()
                .then(() => {
                    dispatch(updateDeleteMessage({ conversationId: Id, messageId: message.id, selectedMessage }));
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            dispatch(deleteGroupMessageThunk({ groupId: Id, messageId: message.id }))
                .unwrap()
                .then(({ data }) => {
                    dispatch(updateGroupDeleteMessage(data));
                });
        }
    };

    const handleEditMessage = () => {
        setIsEditing(true);
        setEditMessage(message);
    };
    return (
        <div className={`bg-[#252525] box-border w-20 fixed z-10 px-3 rounded-md rounded-tl-none`} style={styleMenu}>
            <ul className="list-none m-0">
                {message?.author.id === user?.id && (
                    <li onClick={handleDeleteMessage} className="px-3 py-1 hover:cursor-pointer rounded-md">
                        Delete
                    </li>
                )}
                {message?.author.id === user?.id && (
                    <li className="px-3 py-1 hover:cursor-pointer rounded-md" onClick={handleEditMessage}>
                        Edit
                    </li>
                )}
            </ul>
        </div>
    );
};
