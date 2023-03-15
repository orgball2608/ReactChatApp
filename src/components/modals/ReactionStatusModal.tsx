import { Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { defaultAvatar, REACTIONS_UI } from '../../utils/constants';
import { GroupMessageType, MessageType } from '../../utils/types';
import { AuthContext } from '../../contex/AuthContext';
import { getDisplayName } from '../../utils/helpers';
import { deleteReactionGroupMessageAPI, deleteReactionMessageAPI } from '../../services/api';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

type Props = {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    message: MessageType | GroupMessageType;
};

export const ReactionStatusModal: FC<Props> = ({ setShowModal, message }) => {
    const [selectedReact, setSelectedReact] = useState<string>('all');
    const conversationType = useSelector((state: RootState) => state.type.type);
    const { id } = useParams<{ id: string }>();
    const { user } = useContext(AuthContext);
    const getIcon = (reaction: string) => {
        return REACTIONS_UI[reaction]?.icon;
    };

    const getCountReacts = (reaction: string) => {
        return message.reacts.filter((react) => react.type === reaction).length;
    };

    const getListReacts = () => {
        if (selectedReact === 'all') {
            return message.reacts;
        }
        return message.reacts.filter((react) => react.type === selectedReact);
    };

    const filterReacts = () => {
        const cloneReacts = [...message.reacts];
        return cloneReacts.filter((react, index) =>
            index === cloneReacts.findIndex((obj) => obj.type === react.type));
    };
      
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') {
            setShowModal(false);
        }
    };

    const handleDeleteReaction = (react: any) => {
        if (conversationType === 'group') {
            deleteReactionGroupMessageAPI({
                id: parseInt(id!),
                messageId: message?.id,
                reactionId: react?.id,
            }).then(() => {
                return;
            });
        }
        deleteReactionMessageAPI({
            id: parseInt(id!),
            messageId: message?.id,
            reactionId: react?.id,
        }).then(() => {
            return;
        });
    };

    return (
        <div
            onKeyDown={(e) => handleKeyDown(e)}
            className="w-full h-full bg-overlay-background fixed left-0 top-0 flex justify-center items-center z-50 animate-fade-in"
            tabIndex={-1}
        >
            <div className="bg-modal-background w-screen max-w-[500px] box-border rounded-lg overflow-hidden h-80">
            <div className=" box-border flex justify-center flex-shrink-0 items-center px-4 py-3 border-b-[1px] border-border-conversations ">
                    <div className="mr-auto invisible">
                        <MdClose size={24} className="bg-[#908f8f] cursor-pointer rounded-full" />
                    </div>
                    <span className="text-lg font-medium leading-5">React for Message</span>
                    <div className="ml-auto bg-[#383636] hover:bg-[#494747] p-1 rounded-full">
                        <MdClose size={20} onClick={() => setShowModal(false)} className="cursor-pointer" />
                    </div>
                </div>
                <div className="flex justify-start mx-4 items-center h-12 cursor-pointer mt-2">
                    <div
                        onClick={() => setSelectedReact('all')}
                        className={`px-4 rounded-md hover:bg-[#2f2f30] h-full flex items-center ${
                            selectedReact === 'all' && 'border-b-2 border-[#0099ff] rounded-b-none'
                        } `}
                    >
                        <span className="text-base">All {message.reacts && message.reacts.length}</span>
                    </div>
                    {filterReacts().map((react) => (
                        <div
                            key={react.type}
                            onClick={() => setSelectedReact(react.type)}
                            className={`flex justify-center items-center gap-1 px-4 hover:bg-[#2f2f30] h-full rounded-md ${
                                selectedReact === react.type && 'border-b-2 border-[#0099ff] rounded-b-none'
                            } `}
                        >
                            <img src={getIcon(react.type)!} className="w-5 h-5" alt="icon" />
                            <span className="text-base text-[#0099ff]">{getCountReacts(react.type)}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-2 mx-4 flex-grow overflow-y-auto overflow-x-hidden">
                    {getListReacts().map((react) => (
                        <div
                            key={react.id}
                            className="flex justify-between items-center hover:bg-[#2f2f30] rounded-md px-2 py-2"
                        >
                            <div className="flex justify-start items-center gap-3  rounded-md">
                                <img
                                    src={react.author.profile?.avatar || defaultAvatar}
                                    className="w-10 h-10 rounded-full"
                                    alt="avatar"
                                />
                                <div className="flex flex-col justify-between cursor-pointer">
                                    <span className="text-base">{getDisplayName(react.author)}</span>
                                    {user?.id === react.author.id && (
                                        <span
                                            onClick={() => handleDeleteReaction(react)}
                                            className="text-xs text-[#65676b]"
                                        >
                                            Click to remove
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <img src={getIcon(react.type)!} className="w-7 h-7" alt="icon" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
