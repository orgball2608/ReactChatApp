import { Envelope } from 'akar-icons';
import { Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contex/AuthContext';
import { MessageMenuContext } from '../../contex/MessageMenuContext';
import {
    ForwardGroupMessageToCoversationAPI,
    ForwardGroupMessageToGroupAPI,
    ForwardMessageToCoversationAPI,
    ForwardMessageToGroupAPI,
} from '../../services/api';
import { AppDispatch, RootState } from '../../store';
import { createConversationThunk } from '../../store/coversationSlice';

import { defaultAvatar } from '../../utils/constants';
import { getDisplayName, getFriend, getRecipient } from '../../utils/helpers';
import { Conversation, FriendType } from '../../utils/types';

type Props = {
    setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const ForwardMessageModal: FC<Props> = ({ setShowModal }) => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const conversations = useSelector((state: RootState) => state.conversation.conversations);
    const selectedConversation = conversations.find((conversation) => conversation.id === parseInt(id!));
    const groups = useSelector((state: RootState) => state.group.groups);
    const conversationType = useSelector((state: RootState) => state.type.type);
    const friends = useSelector((state: RootState) => state.friends.friends);
    const { forwardMessage } = useContext(MessageMenuContext);
    const [selectedConversations, setSelectedConversations] = useState<number[]>([]);
    const [selectedGroups, setSelectedGroups] = useState<number[]>([]);
    const [selectedFriends, setSelectedFriends] = useState<number[]>([]);

    let newConversations;
    let newGroups;
    let newFriends;
    if (conversationType === 'private') {
        newConversations = conversations.filter((conversation) => conversation.id !== parseInt(id!));
        newGroups = groups;
        newFriends = friends.filter(
            (friend) =>
                friend.receiver.id !== getRecipient(selectedConversation!, user!).id ||
                friend.sender.id !== getRecipient(selectedConversation!, user!).id,
        );
    } else {
        newGroups = groups.filter((group) => group.id !== parseInt(id!));
        newConversations = conversations;
        newFriends = friends;
    }

    const handleForwardMessageToConversation = (forwardedId: number) => {
        if (conversationType === 'group') {
            ForwardGroupMessageToCoversationAPI({
                id: parseInt(id!),
                forwardedId,
                messageId: forwardMessage!.id,
            });

            return;
        }
        ForwardMessageToCoversationAPI({
            id: parseInt(id!),
            forwardedId,
            messageId: forwardMessage!.id,
        });
    };

    const handleForwardMessageToGroup = (forwardedId: number) => {
        if (conversationType === 'group') {
            ForwardGroupMessageToGroupAPI({
                id: parseInt(id!),
                forwardedId,
                messageId: forwardMessage!.id,
            });
            setSelectedGroups((prev) => [...prev, forwardedId]);
            return;
        }
        ForwardMessageToGroupAPI({
            id: parseInt(id!),
            forwardedId,
            messageId: forwardMessage!.id,
        });
        setSelectedGroups((prev) => [...prev, forwardedId]);
    };

    const CheckExistConversation = (id: number) => {
        return conversations.find((conversation) => conversation.creator.id === id || conversation.recipient.id === id);
    };

    const handleForwardMessageToFriend = (friend: FriendType) => {
        const existConversation = CheckExistConversation(friend.id);
        const friendDB = getFriend(friend, user!);
        if (existConversation) {
            handleForwardMessageToConversation(existConversation.id);
        } else {
            dispatch(
                createConversationThunk({
                    email: friendDB.email,
                    message: '',
                }),
            )
                .unwrap()
                .then(({ data }) => {
                    handleForwardMessageToConversation(data.id);
                })
                .catch((err) => console.log(err));
        }
        setSelectedFriends((prev) => [...prev, friend.id]);
    };

    const isSelectedConversation = (conversationId: number) => {
        return selectedConversations.find((id) => id === conversationId);
    };
    const isSelectedGroup = (groupId: number) => {
        return selectedGroups.find((id) => id === groupId);
    };
    const isSelectedFriend = (friendId: number) => {
        return selectedFriends.find((id) => id === friendId);
    };

    return (
        <div
            className="w-full h-full bg-overlay-background fixed left-0 top-0 flex justify-center items-center z-50 animate-fade-in "
            tabIndex={-1}
        >
            <div className="bg-modal-background w-screen max-w-[550px] box-border rounded-lg font-poppins overflow-hidden h-4/5 min-w-screen flex flex-col gap-4">
                <div className=" box-border flex justify-center flex-shrink-0 items-center px-4 py-4 border-b-[1px] border-border-conversations ">
                    <div className="mr-auto invisible">
                        <MdClose size={24} className="bg-[#908f8f] cursor-pointer rounded-full" />
                    </div>
                    <span className="text-xl font-semibold leading-5">Forward</span>
                    <div className="ml-auto bg-[#383636] hover:bg-[#494747] p-1 rounded-full">
                        <MdClose size={20} onClick={() => setShowModal(false)} className="cursor-pointer" />
                    </div>
                </div>
                <div className="flex flex-col overflow-hidden overflow-y-auto">
                    {newConversations.length > 0 && (
                        <div className="flex flex-col px-4 py-2">
                            <span className="px-2 font-medium">Recent</span>
                            {newConversations.map((conversation: Conversation) => (
                                <div
                                    key={conversation.id}
                                    className="flex justify-between items-center gap-1 py-2 box-border rounded-md w-full "
                                >
                                    <div className=" mx-2 rounded-full relative flex gap-3 justify-start items-center">
                                        <LazyLoadImage
                                            src={getRecipient(conversation, user!)?.profile?.avatar || defaultAvatar}
                                            alt={'profile'}
                                            className="h-10 w-10 rounded-full flex-none object-cover "
                                        />
                                        <span className="block font-medium text-base ">{` ${getDisplayName(
                                            getRecipient(conversation, user!),
                                        )}`}</span>
                                    </div>
                                    <div className=" rounded-md flex justify-center items-center w-fit h-fit transform active:scale-125 transition-all duration-300">
                                        {isSelectedConversation(conversation.id) ? (
                                            <button className="p-2 rounded-md text-sm bg-[#727785] text-white font-semibold flex justify-center items-center gap-1 opacity-50 pointer-events-none">
                                                <Envelope size={20} />
                                                <span>Sended</span>
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    handleForwardMessageToConversation(conversation.id);
                                                    setSelectedConversations((prev) => [...prev, conversation.id]);
                                                }}
                                                className="p-2 rounded-md text-sm bg-[#0084ff] text-white font-semibold"
                                            >
                                                Send
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {newGroups.length > 0 && (
                        <div className="flex flex-col px-4 py-2">
                            <span className="px-2 font-medium">Groups</span>
                            {newGroups.map((group) => (
                                <div
                                    key={group.id}
                                    className="flex justify-between items-center gap-1 py-2 box-border rounded-md w-full "
                                >
                                    <div className=" mx-2 rounded-full relative flex  gap-3 justify-start items-center">
                                        <LazyLoadImage
                                            src={group.avatar || defaultAvatar}
                                            alt={'profile'}
                                            className="h-10 w-10 rounded-full flex-none object-cover "
                                        />
                                        <span className="block font-medium text-base ">{` ${
                                            group.title || 'Group'
                                        }`}</span>
                                    </div>
                                    <div className=" rounded-md flex justify-center items-center w-fit h-fit transform active:scale-125 transition-all duration-300">
                                        {isSelectedGroup(group.id) ? (
                                            <button className="p-2 rounded-md text-sm bg-[#727785] text-white font-semibold flex justify-center items-center gap-1 opacity-50 pointer-events-none">
                                                <Envelope size={20} />
                                                <span>Sended</span>
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleForwardMessageToGroup(group.id)}
                                                className="p-2 rounded-md text-sm bg-[#0084ff] text-white font-semibold"
                                            >
                                                Send
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {newFriends.length > 0 && (
                        <div className="flex flex-col px-4 py-2">
                            <span className="px-2 font-medium">Friends</span>
                            {newFriends.map((friend) => (
                                <div
                                    key={friend.id}
                                    className="flex justify-between items-center gap-1 py-2 box-border rounded-md w-full "
                                >
                                    <div className=" mx-2 rounded-full relative flex  gap-3 justify-start items-center">
                                        <LazyLoadImage
                                            src={getFriend(friend, user!)?.profile?.avatar || defaultAvatar}
                                            alt={'profile'}
                                            className="h-10 w-10 rounded-full flex-none object-cover "
                                        />
                                        <span className="block font-medium text-base ">{`${getDisplayName(
                                            getFriend(friend, user!),
                                        )}`}</span>
                                    </div>
                                    {isSelectedFriend(friend.id) ? (
                                        <button className="p-2 rounded-md text-sm bg-[#727785] text-white font-semibold flex justify-center items-center gap-1 opacity-50 pointer-events-none">
                                            <Envelope size={20} />
                                            <span>Sended</span>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleForwardMessageToFriend(friend)}
                                            className="p-2 rounded-md text-sm bg-[#0084ff] text-white font-semibold"
                                        >
                                            Send
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
