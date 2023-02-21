import { Dispatch, FC, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contex/AuthContext';
import {
    reactionGroupMessageAPI,
    reactionMessageAPI,
    deleteReactionMessageAPI,
    deleteReactionGroupMessageAPI,
} from '../../services/api';
import { RootState } from '../../store';
import { REACTIONS_UI } from '../../utils/constants';
import { GroupMessageType, MessageType, ReactionMessageType } from '../../utils/types';

type Props = {
    message: MessageType | GroupMessageType;
    setVisible: Dispatch<boolean>;
};

export const ReactionPopup: FC<Props> = ({ message, setVisible }) => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const conversationType = useSelector((state: RootState) => state.type.type);

    const handleReactionClick = (key: string) => {
        if (!user?.id) return;
        const reaction = message?.reacts?.find((reaction: ReactionMessageType) => reaction?.author?.id === user?.id);

        if (conversationType === 'group') {
            if (reaction?.type === key) {
                deleteReactionGroupMessageAPI({
                    id: parseInt(id!),
                    messageId: message?.id,
                    reactionId: reaction?.id,
                }).then(() => {
                    setVisible(false);
                    return;
                });
            }
            reactionGroupMessageAPI(parseInt(id!), message?.id, key).then(() => {
                setVisible(false);
            });
        } else {
            if (reaction?.type === key) {
                deleteReactionMessageAPI({
                    id: parseInt(id!),
                    messageId: message?.id,
                    reactionId: reaction?.id,
                }).then(() => {
                    setVisible(false);
                    return;
                });
            }
            reactionMessageAPI(parseInt(id!), message?.id, key).then(() => {
                setVisible(false);
            });
        }
    };
    const getMyReaction = () => {
        if (!user?.id) return;
        const reaction = message?.reacts?.find((reaction: ReactionMessageType) => reaction.author?.id === user?.id);
        return reaction?.type;
    };

    return (
        <div className={`flex gap-1 bg-dark-lighten p-[6px] z-[1] animate-fade-in w-fit`}>
            {Object.entries(REACTIONS_UI).map(([key, value], index) => (
                <div
                    key={index}
                    className={`${
                        getMyReaction() === key
                            ? 'relative after:absolute after:left-1/2 after:top-full after:-translate-x-1/2 after:w-[5px] after:h-[5px] after:rounded-full after:bg-primary'
                            : ''
                    }`}
                >
                    <img
                        onClick={() => handleReactionClick(key)}
                        className={`w-7 h-7 cursor-pointer hover:scale-[115%] origin-bottom transition duration-300`}
                        src={value.gif}
                        alt=""
                    />
                </div>
            ))}
        </div>
    );
};
