import { Group } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

type Props = {
    group: Group;
};
export const GroupSideBarItem: FC<Props> = ({ group }) => {
    const navigate = useNavigate();
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
                <span className="block font-bold text-base">{group.title || 'Group'}</span>
                <span className="text-sm text-white">{group.lastMessageSent?.content}</span>
            </div>
        </div>
    );
};
