import { Group } from '../../utils/types';
import { useNavigate, useParams } from 'react-router-dom';
import { FC } from 'react';
import { defaultGroupAvatar } from '../../utils/constants';
import moment from 'moment';

type Props = {
    group: Group;
};
export const GroupSideBarItem: FC<Props> = ({ group }) => {
    const navigate = useNavigate();
    const { id } = useParams();
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
        return usersToString?.length > MAX_LENGTH_OF_TITLE
            ? usersToString.slice(0, MAX_LENGTH_OF_TITLE).concat('...')
            : usersToString;
    };

    const lastMessageContent = () => {
        const { lastMessageSent } = group;
        if (lastMessageSent) {
            if (
                lastMessageSent.content === '' ||
                (lastMessageSent.attachments && lastMessageSent.attachments?.length > 0)
            ) {
                return `Just sent ${
                    lastMessageSent.attachments?.length > 1 ? `${lastMessageSent.attachments.length}` : 'a'
                } photo`;
            }
            return lastMessageSent.content?.length > MAX_MESSAGE_LENGTH
                ? lastMessageSent.content.slice(0, MAX_MESSAGE_LENGTH).concat('...')
                : lastMessageSent.content;
        }
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
            className={'mt-42 items-center w-full px-1'}
            onClick={() => {
                navigate(`/groups/${group.id}`);
            }}
            key={group.id}
        >
            <div
                className={`flex justify-start gap-2 py-2 px-4 rounded-lg box-border ${
                    group.id === parseInt(id!) ? '!bg-[#252F3C]' : ''
                } hover:bg-[#1a1a1b] `}
            >
                <img src={getGroupAvatar()} alt="avatar" className=" h-12 w-12 rounded-full bg-white object-cover" />
                <div className="flex flex-col flex-nowrap flex-1 break-all justify-center">
                    <span className="block font-bold text-base">{getGroupTitleDisplay(group)}</span>
                    <div className="flex justify-start items-center">
                        <span className="text-sm text-white">{lastMessageContent()}</span>
                        <span className="text-sm text-[#65676b] ml-3 font-semibold">
                            {moment(group?.lastMessageSentAt).fromNow(true)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
