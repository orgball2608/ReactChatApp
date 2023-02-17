import { Group } from '../../utils/types';
import { useNavigate, useParams } from 'react-router-dom';
import { FC } from 'react';
import { defaultGroupAvatar } from '../../utils/constants';
import moment from 'moment';
import { lastMessageContent } from '../../utils/helpers';

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
        } else {
            return defaultGroupAvatar;
        }
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
                <img src={getGroupAvatar()} alt="avatar" className=" h-12 w-12 rounded-full bg-white object-cover" />
                <div className="flex flex-col flex-nowrap flex-1 break-all justify-center">
                    <span className="block font-bold text-base">{getGroupTitleDisplay(group)}</span>
                    <div className="flex justify-start items-center">
                        <span className="text-sm text-white">{lastMessageContent(group)}</span>
                        <span className="text-sm text-[#65676b] ml-3 font-semibold">
                            {moment(group?.lastMessageSentAt).fromNow(true)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
