import { Group } from '../../utils/types';
import { useNavigate, useParams } from 'react-router-dom';
import { FC } from 'react';
import { defaultGroupAvatar } from '../../utils/constants';
import moment from 'moment';
import { lastMessageContent } from '../../utils/helpers';
import { GroupDefaultAvatar } from '../commons/GroupDefaultAvatar';

type Props = {
    group: Group;
};
export const GroupSideBarItem: FC<Props> = ({ group }) => {
    const navigate = useNavigate();
    const { id } = useParams();
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
                className={`flex justify-start gap-2 py-2 px-4 rounded-lg box-border   ${
                    group.id === parseInt(id!) ? 'bg-[#252F3C]' : 'hover:bg-[#28282b]'
                } `}
            >
                {group.avatar ? (
                    <img
                        src={getGroupAvatar()}
                        alt="avatar"
                        className=" h-12 w-12 rounded-full bg-white object-cover"
                    />
                ) : (
                    <GroupDefaultAvatar group={group} groupSize={12} itemSize={9} />
                )}

                <div className="flex flex-col flex-nowrap font-normal flex-1 break-all justify-center">
                    <span className="block text-white">{getGroupTitleDisplay(group)}</span>
                    <div className="flex justify-start items-center max-w-[240px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                        <span className="text-sm text-[#65676b]">{lastMessageContent(group)}</span>
                        <span className="text-sm text-[#65676b] ml-3 ">
                            {moment(group?.lastMessageSentAt).format('H:mm')}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
