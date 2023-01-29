import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction } from 'react';
import { GroupMessageType, MessageType } from '../../utils/types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { editMessageThunk } from '../../store/messageSlice';
import { selectType } from '../../store/typeSlice';
import { editGroupMessageThunk } from '../../store/groupMessageSlice';

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
                .then(() => setIsEditing(false))
                .catch((err) => {
                    console.log(err);
                    setIsEditing(false);
                });
        } else {
            dispatch(editGroupMessageThunk(params))
                .unwrap()
                .then(() => setIsEditing(false))
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
                    className="bg-[#222] w-full py-1 outline-0 border-0 rounded box-border font-Inter px-2"
                    onChange={onEditMessageChange}
                    defaultValue={editMessage?.content}
                />
            </form>
            <div className="text-sm text-[1d77ff] text-end">
                escape to <span className="text-red-600">cancel</span> - enter to{' '}
                <span className="text-blue-button">save</span>
            </div>
        </div>
    );
};
