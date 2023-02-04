import { Dispatch, FC, SetStateAction, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contex/AuthContext';
import { changeGroupOwner } from '../../services/api';
import { AppDispatch, RootState } from '../../store';
import { removeRecentGroupThunk } from '../../store/groupSlice';
import { userContextMenuItems } from '../../utils/constants';
import { getUserContextMenuIcon } from '../../utils/helpers';
import { ContextMenuItemType, Group, User, UserContextMenuItemType } from '../../utils/types';
import { toast } from 'react-toastify';

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

    const getUserMenuContexAction = (user?: User, group?: Group) => {
        if (!user || !group) return [];
        if (group.owner.id === user.id) {
            return userContextMenuItems;
        } else {
            return userContextMenuItems.filter((item) => item.ownerOnly !== true);
        }
    };

    type CustomIconProps = {
        action: UserContextMenuItemType;
    };
    const CustomIcon: FC<CustomIconProps> = ({ action }) => {
        const { icon: MyIcon } = getUserContextMenuIcon(action);
        return <MyIcon size={26} />;
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
                console.log('profile');
                break;
            default:
                break;
        }
    };

    return (
        <div className={` w-60 rounded-3xl`}>
            <div className="flex flex-col justify-center">
                {getUserMenuContexAction(user, selectedGroup).map((item: ContextMenuItemType) => (
                    <div
                        onClick={() => handleMenuContextAction(item.action)}
                        key={item.label}
                        className="text-white flex p-1 justify-start gap-4 text-base hover:bg-[#959292] rounded-md  "
                    >
                        <div className="">
                            <CustomIcon action={item.action} />
                        </div>
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
