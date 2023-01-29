import { Group } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

type Props = {
    group: Group;
};
export const GroupSideBarItem: FC<Props> = ({ group }) => {
    const navigate = useNavigate();
    const MAX_LENGTH_OF_TITLE = 23;
    const MAX_MESSAGE_LENGTH = 20;
    const getGroupTitleDisplay = (group: Group) => {
        if (!group.title) {
            const usersToString = group.users.map((user) => user.firstName).join(', ');
            return usersToString.length > MAX_LENGTH_OF_TITLE
                ? usersToString.slice(0, MAX_LENGTH_OF_TITLE).concat('...')
                : usersToString;
        }
        return group.title.length > MAX_LENGTH_OF_TITLE
            ? group.title.slice(0, MAX_LENGTH_OF_TITLE).concat('...')
            : group.title;
    };

    const lastMessageContent = () => {
        const { lastMessageSent } = group;
        if (lastMessageSent)
            return lastMessageSent.content.length > MAX_MESSAGE_LENGTH
                ? lastMessageSent.content.slice(0, MAX_MESSAGE_LENGTH).concat('...')
                : lastMessageSent.content;
        return null;
    };
    return (
        <div
            className={
                'flex justify-start items-center gap-5 px-8 py-3 box-border border-b-[1px] border-solid border-border-conversations bg-simple-gray'
            }
            onClick={() => {
                navigate(`/groups/${group.id}`);
            }}
            key={group.id}
        >
            <div className="bg-white h-12 w-12 rounded-full bg-blue-500"></div>
            <div>
                <span className="block font-bold text-base">{getGroupTitleDisplay(group)}</span>
                <span className="text-sm text-white">{lastMessageContent()}</span>
            </div>
        </div>
    );
};
