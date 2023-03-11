import Tippy from '@tippyjs/react';
import { useContext, useEffect, useState } from 'react';
import { BsFillPersonCheckFill, BsFillPersonXFill, BsMessenger, BsPersonPlusFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contex/AuthContext';
import { getFriendRequestByUserId, getUserById } from '../../services/api';
import { AppDispatch, RootState } from '../../store';
import { createConversationThunk } from '../../store/coversationSlice';
import {
    acceptFriendRequestReceive,
    cancelFriendRequestSend,
    postFriendRequest,
    rejectFriendRequestReceive,
} from '../../store/friendSlice';
import { changePage } from '../../store/selectedPageSlice';
import { changeType } from '../../store/typeSlice';
import { FriendRequestType, FriendType, User } from '../../utils/types';
import { FriendRequestResponse } from '../menu-context/FriendRequestResponse';
import { ProfileActionMenuContext } from '../menu-context/ProfileActionMenuContex';

export const ProfileAction = () => {
    const { id } = useParams();
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useContext(AuthContext);
    const [recipient, setRecipient] = useState<User>();
    const [request, setRequest] = useState<FriendType | FriendRequestType>();
    const friends = useSelector((state: RootState) => state.friends.friends);
    const friendReceiver = useSelector((state: RootState) => state.friends.receiveRequests);
    const friendSender = useSelector((state: RootState) => state.friends.sendRequests);
    const conversations = useSelector((state: RootState) => state.conversation.conversations);
    const conversationType = useSelector((state: RootState) => state.type.type);
    const navigate = useNavigate();
    const exitsConversation = conversations.find(
        (conversation) => conversation.creator.id === parseInt(id!) || conversation.recipient.id === parseInt(id!),
    );

    const existsReceiver = friendReceiver.find(
        (friend) => friend.sender.id === parseInt(id!) && friend.receiver.id === user?.id,
    );
    const existsSender = friendSender.find(
        (friend) => friend.receiver.id === parseInt(id!) && friend.sender.id === user?.id,
    );

    useEffect(() => {
        setRecipient(undefined);
        getUserById(parseInt(id!)).then((res) => {
            setRecipient(res.data);
        });

        getFriendRequestByUserId(parseInt(id!)).then((res) => {
            setRequest(res.data);
        });
    }, [id, existsReceiver, existsSender]);

    const isFriend = friends.find(
        (friend) => friend.receiver.id === parseInt(id!) || friend.sender.id === parseInt(id!),
    );

    const handleAddFriend = () => {
        if (recipient) {
            const { email } = recipient;
            dispatch(postFriendRequest({ email }))
                .unwrap()
                .then(() => {
                    setVisible(false);
                    toast.success('Add friend request successfully');
                })
                .catch((err: string) => {
                    console.log(err);
                    toast.error('Add friend request failed');
                });
        }
    };

    const handleAcceptFriend = () => {
        if (request) {
            const { id } = request;
            dispatch(acceptFriendRequestReceive(id))
                .unwrap()
                .then(() => {
                    toast.success('Accept friend request successfully');
                })
                .catch((err) => {
                    toast.error(err.message);
                });
        }
    };

    const handleCancelRequest = () => {
        if (request) {
            const { id } = request;
            dispatch(cancelFriendRequestSend(id))
                .unwrap()
                .then(() => {
                    toast.success('Cancle friend request successfully');
                })
                .catch((err) => {
                    toast.error(err.message);
                });
        }
    };

    const handleSendMessage = () => {
        if (exitsConversation) {
            navigate(`../../conversations/${exitsConversation.id}`);
            dispatch(changePage('conversations'));
            if (conversationType === 'group') dispatch(changeType('private'));
        } else {
            recipient &&
                dispatch(
                    createConversationThunk({
                        email: recipient.email,
                        message: '',
                    }),
                )
                    .unwrap()
                    .then(({ data }) => {
                        navigate(`../../conversations/${data.id}`);
                    })
                    .catch((err) => console.log(err));
        }
    };

    const handleRejectFriendRequest = () => {
        if (request) {
            const { id } = request;
            dispatch(rejectFriendRequestReceive(id))
                .unwrap()
                .then(() => {
                    toast.success('Reject friend request successfully');
                })
                .catch((err) => {
                    toast.error(err.message);
                });
        }
    };

    const getStatus = () => {
        if (existsReceiver)
            return (
                <Tippy
                    visible={visible}
                    onClickOutside={() => setVisible(false)}
                    content={
                        <FriendRequestResponse
                            request={request}
                            setVisible={setVisible}
                            handleAcceptFriend={handleAcceptFriend}
                            handleRejectFriendRequest={handleRejectFriendRequest}
                        />
                    }
                    placement="top"
                    interactive={true}
                    animation="fade"
                    theme="profile_option"
                >
                    <div
                        onClick={() => setVisible((prevState) => !prevState)}
                        className="flex justify-center gap-2 items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-base hover:opacity-80 hover:cursor-pointer  transform active:scale-125 transition-all duration-300"
                    >
                        <div>
                            <BsFillPersonCheckFill size={20} />
                        </div>
                        <span>Response</span>
                    </div>
                </Tippy>
            );
        if (existsSender)
            return (
                <div
                    onClick={handleCancelRequest}
                    className="flex justify-center gap-2 items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-base z-20 hover:opacity-80 hover:cursor-pointer  transform active:scale-125 transition-all duration-300"
                >
                    <div>
                        <BsFillPersonXFill size={20} />
                    </div>
                    <span>Cancel Request</span>
                </div>
            );
        else
            return (
                <div
                    onClick={handleAddFriend}
                    className="flex justify-center gap-2 items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-base hover:opacity-80 hover:cursor-pointer  transform active:scale-125 transition-all duration-300"
                >
                    <div>
                        <BsPersonPlusFill size={20} />
                    </div>
                    <span>Add Friend</span>
                </div>
            );
    };

    return (
        <div className="flex justify-center gap-2 mr-10">
            {isFriend ? (
                <Tippy
                    visible={visible}
                    onClickOutside={() => setVisible(false)}
                    content={<ProfileActionMenuContext friend={isFriend} setVisible={setVisible} />}
                    placement="top-start"
                    interactive={true}
                    animation="fade"
                    theme="profile_option"
                >
                    <div
                        onClick={() => setVisible((prevState) => !prevState)}
                        className="flex justify-center gap-2 items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-base hover:opacity-80 hover:cursor-pointer transform active:scale-125 transition-all duration-300"
                    >
                        <div>
                            <BsFillPersonCheckFill size={20} />
                        </div>
                        <span>Friend</span>
                    </div>
                </Tippy>
            ) : (
                getStatus()
            )}
            {isFriend && (
                <div
                    onClick={handleSendMessage}
                    className="flex justify-center gap-2 items-center bg-dark-lighten text-white px-4 py-2 rounded-lg font-medium text-base hover:opacity-80 hover:cursor-pointer  transform active:scale-125 transition-all duration-300"
                >
                    <div>
                        <BsMessenger size={18} />
                    </div>
                    <span>Message</span>
                </div>
            )}
        </div>
    );
};
