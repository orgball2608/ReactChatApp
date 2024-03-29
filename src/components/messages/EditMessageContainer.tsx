import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction } from 'react';
import { GroupMessageType, MessageType } from '../../utils/types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { editMessageThunk } from '../../store/messageSlice';
import { selectType } from '../../store/typeSlice';
import { editGroupMessageThunk } from '../../store/groupMessageSlice';
import { updateEditMessage } from '../../store/coversationSlice';
import { updateGroupEditMessage } from '../../store/groupSlice';

type Props = {
    onEditMessageChange: (e: ChangeEvent<HTMLInputElement>) => void;
    editMessage: MessageType | GroupMessageType;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
};
export const EditMessageContainer: FC<Props> = ({ onEditMessageChange, editMessage, setIsEditing }) => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const conversationType = useSelector((state: RootState) => selectType(state));

    const handleSubmitEditMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const params = {
            id: parseInt(id!),
            messageId: editMessage?.id,
            content: editMessage?.content,
        };
        if (conversationType === 'private') {
            dispatch(editMessageThunk(params))
                .unwrap()
                .then(() => {
                    dispatch(updateEditMessage(params));
                    setIsEditing(false);
                })
                .catch((err) => {
                    console.log(err);
                    setIsEditing(false);
                });
        } else {
            dispatch(editGroupMessageThunk(params))
                .unwrap()
                .then(() => {
                    dispatch(updateGroupEditMessage(params));
                    setIsEditing(false);
                })
                .catch((err) => {
                    console.log(err);
                    setIsEditing(false);
                });
        }
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmitEditMessage}>
                <input
                    className="bg-[#222] w-full py-2 outline-0 border-0 rounded-2xl box-border px-3 text-base"
                    onChange={onEditMessageChange}
                    defaultValue={editMessage?.content}
                    autoFocus
                />
            </form>
            <div className="text-sm text-white text-end">
                escape to <span className="text-red-600">cancel</span> - enter to{' '}
                <span className="text-blue-button">save</span>
            </div>
        </div>
    );
};
