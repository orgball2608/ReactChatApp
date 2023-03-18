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
import { GroupMessageType, MessageType } from '../../utils/types';

type Props = {
    setIsEditing: Dispatch<SetStateAction<boolean>>;
    message: MessageType | GroupMessageType;
    setVisible: Dispatch<SetStateAction<boolean>>;
};
export const MenuContext: FC<Props> = ({ setIsEditing, message, setVisible }) => {
    const { setEditMessage, setIsForwarding, setForwardMessage } = useContext(MessageMenuContext);
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const conMessages = useSelector((state: RootState) => state.messages.messages);
    const conversationType = useSelector((state: RootState) => selectType(state));
    const selectedMessage = conMessages.find((con) => con.id === parseInt(id!));
    const handleDeleteMessage = () => {
        const Id = parseInt(id!);
        if (!message) return;
        setVisible(false);
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
        setEditMessage(message!);
    };
    return (
        <div className={`box-border text-base w-full`}>
            <ul className="list-none m-0 min-w-[140px]">
                {message?.author.id === user?.id && (
                    <li
                        onClick={handleDeleteMessage}
                        className="px-3 py-[2px] w-full hover:cursor-pointer rounded-md hover:bg-[#555454]"
                    >
                        Delete
                    </li>
                )}
                {message?.author.id === user?.id && (
                    <li
                        className="px-3 py-[2px] hover:cursor-pointer rounded-md hover:bg-[#5f5d5d]"
                        onClick={handleEditMessage}
                    >
                        Edit
                    </li>
                )}
                <li
                    onClick={() => {
                        setIsForwarding(true);
                        setVisible(false);
                        setForwardMessage(message);
                    }}
                    className="px-3 py-1 hover:cursor-pointer rounded-md hover:bg-[#555454]"
                >
                    Forward
                </li>
            </ul>
        </div>
    );
};
