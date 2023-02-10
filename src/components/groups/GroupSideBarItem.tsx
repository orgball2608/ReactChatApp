import { Group } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
import defaultGroupAvatar from '../../__assets__/groupAvatar.png';

type Props = {
    group: Group;
};
export const GroupSideBarItem: FC<Props> = ({ group }) => {
    const navigate = useNavigate();
    const MAX_LENGTH_OF_TITLE = 23;
    const MAX_MESSAGE_LENGTH = 20;
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
        return usersToString.length > MAX_LENGTH_OF_TITLE
            ? usersToString.slice(0, MAX_LENGTH_OF_TITLE).concat('...')
            : usersToString;
    };

    const lastMessageContent = () => {
        const { lastMessageSent } = group;
        if (lastMessageSent)
            return lastMessageSent.content.length > MAX_MESSAGE_LENGTH
                ? lastMessageSent.content.slice(0, MAX_MESSAGE_LENGTH).concat('...')
                : lastMessageSent.content;
        return null;
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
            className={'mt-42 items-center w-full bg-simple-gray'}
            onClick={() => {
                navigate(`/groups/${group.id}`);
            }}
            key={group.id}
        >
            <div className="flex justify-start gap-5 mx-6 py-3 box-border border-b-[1px] border-solid border-border-conversations">
                <img src={getGroupAvatar()} alt="avatar" className=" h-12 w-12 rounded-full bg-white object-cover" />
                <div>
                    <span className="block font-bold text-base">{getGroupTitleDisplay(group)}</span>
                    <span className="text-sm text-white">{lastMessageContent()}</span>
                </div>
            </div>
        </div>
    );
};
