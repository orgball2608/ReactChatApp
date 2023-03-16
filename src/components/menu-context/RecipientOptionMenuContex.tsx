import { Dispatch, FC, SetStateAction, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../contex/AuthContext';
import { changeGroupOwner } from '../../services/api';
import { AppDispatch, RootState } from '../../store';
import { removeRecentGroupThunk } from '../../store/groupSlice';
import { userContextMenuItems } from '../../utils/constants';
import { getUserContextMenuIcon } from '../../utils/helpers';
import { ContextMenuItemType, Conversation, Group, User, UserContextMenuItemType } from '../../utils/types';
import { toast } from 'react-toastify';
import { changeType } from '../../store/typeSlice';
import { createConversationThunk } from '../../store/coversationSlice';

type Props = {
    recipient: User;
    setVisible: Dispatch<SetStateAction<boolean>>;
};
export const RecipientOptionMenuContext: FC<Props> = ({ recipient, setVisible }) => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const group = useSelector((state: RootState) => state.group.groups);
    const selectedGroup = group.find((item) => item.id === parseInt(id!));
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const conversationType = useSelector((state: RootState) => state.type.type);
    const conversations = useSelector((state: RootState) => state.conversation.conversations);
    const exitsConversation = conversations.find(
        (conversation: Conversation) =>
            (conversation.creator.id === recipient?.id && conversation.recipient.id === user?.id) ||
            (conversation.recipient.id === recipient?.id && conversation.creator.id === user?.id),
    );

    const getUserMenuContexAction = (user?: User, group?: Group) => {
        if (!user || !group) return [];
        if (user?.id === recipient.id && group.owner.id === recipient.id) {
            return userContextMenuItems.filter((item) => item.label === 'Profile');
        } else if (group.owner?.id === user?.id) {
            return userContextMenuItems;
        } else {
            return userContextMenuItems.filter((item) => !item.ownerOnly);
        }
    };

    type CustomIconProps = {
        action: UserContextMenuItemType;
    };
    const CustomIcon: FC<CustomIconProps> = ({ action }) => {
        const { icon: MyIcon } = getUserContextMenuIcon(action);
        return <MyIcon size={24} />;
    };

    const handleMenuContextAction = (action: UserContextMenuItemType) => {
        switch (action) {
            case 'kick':
                dispatch(removeRecentGroupThunk({ userId: recipient.id, groupId: selectedGroup!.id }))
                    .then(() => {
                        toast.success('User has been kicked');
                        setVisible(false);
                    })
                    .catch((err) => toast.error(err.message));

                break;
            case 'transfer_owner':
                changeGroupOwner({ groupId: selectedGroup!.id, newOwnerId: recipient.id })
                    .then(() => {
                        toast.success('Owner has been changed');
                        setVisible(false);
                    })
                    .catch((err) => toast.error(err.message));
                break;
            case 'profile':
                navigate(`/friend/profile/${recipient.id}`);
                setVisible(false);
                break;
            case 'message':
                if (exitsConversation) {
                    if (conversationType === 'group') dispatch(changeType('private'));
                    navigate(`/conversations/${exitsConversation.id}`);
                    setVisible(false);
                } else {
                    dispatch(
                        createConversationThunk({
                            email: recipient?.email,
                            message: 'test',
                        }),
                    )
                        .unwrap()
                        .then(({ data }) => {
                            if (conversationType === 'group') dispatch(changeType('private'));
                            navigate(`/conversations/${data.id}`);
                        })
                        .catch((err) => console.log(err));
                }

                break;
            default:
                break;
        }
    };

    return (
        <div className={`w-60 rounded-3xl`}>
            <div className="flex flex-col justify-center gap-1 cursor-pointer">
                {getUserMenuContexAction(user, selectedGroup).map((item: ContextMenuItemType) => (
                    <div
                        onClick={() => handleMenuContextAction(item.action)}
                        key={item.label}
                        className="text-white flex p-1 justify-start gap-6 text-base hover:bg-[#555454] rounded-md py-2 "
                    >
                        <div className="w-4 h-4 rounded-full">
                            <CustomIcon action={item.action} />
                        </div>
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
