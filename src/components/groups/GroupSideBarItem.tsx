import { Group, MessageStatus } from '../../utils/types';
import { useNavigate, useParams } from 'react-router-dom';
import { FC, useContext } from 'react';
import { defaultGroupAvatar } from '../../utils/constants';
import moment from 'moment';
import { lastMessageContent } from '../../utils/helpers';
import { GroupDefaultAvatar } from '../commons/GroupDefaultAvatar';
import { AuthContext } from '../../contex/AuthContext';

type Props = {
    group: Group;
};
export const GroupSideBarItem: FC<Props> = ({ group }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const {user} = useContext(AuthContext)
    const MAX_LENGTH_OF_TITLE = 23;
    const getGroupTitleDisplay = (group: Group) => {
        if (group.title) {
            return group.title.length > MAX_LENGTH_OF_TITLE
                ? group.title.slice(0, MAX_LENGTH_OF_TITLE).concat('...')
                : group.title;
        }
        const usersToString = group.users
            .map((user) => {
                if (user) return user.firstName;
            })
            .join(', ');
        return usersToString?.length > MAX_LENGTH_OF_TITLE
            ? usersToString.slice(0, MAX_LENGTH_OF_TITLE).concat('...')
            : usersToString;
    };

    const getGroupAvatar = () => {
        if (group.avatar) {
            return group.avatar;
        }
        return defaultGroupAvatar;
    };

    return (
        <div
            className={'mt-42 items-center w-full px-1'}
            onClick={() => {
                navigate(`/groups/${group.id}`);
            }}
            key={group.id}
        >
            <div
                className={`flex justify-start gap-2 py-2 px-4 rounded-lg box-border relative  ${
                    group.id === parseInt(id!) ? 'bg-[#252F3C]' : 'hover:bg-[#28282b]'
                } `}
            >
                {group.avatar ? (
                    <img
                        src={getGroupAvatar()}
                        alt="avatar"
                        className=" h-12 w-12 rounded-full bg-white object-cover flex-shrink-0"
                    />
                ) : (
                    <GroupDefaultAvatar group={group} groupSize={12} itemSize={9} />
                )}

                <div className="flex flex-col flex-grow flex-nowrap font-normal flex-1 break-all justify-center">
                    <p className="text-white flex-grow  font-medium">{getGroupTitleDisplay(group)}</p>
                    <p className="text-sm flex-grow text-gray-400 max-w-[240px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap">{lastMessageContent(group)} • {moment(group?.lastMessageSentAt).format('H:mm')}</p>
                </div>
                {
                    group && group.lastMessageSent.messageStatuses?.find((status: MessageStatus) => status.user.id === user?.id) ? <></>: <div className="absolute top-1/2 -translate-y-1/2 right-4 w-[10px] h-[10px] bg-[#0d90f3] rounded-full"></div>
                }
            </div>
        </div>
    );
};
