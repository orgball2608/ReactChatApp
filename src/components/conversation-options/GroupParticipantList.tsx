import { User } from '../../utils/types';
import { FC } from 'react';

type Props = {
    onlineUsers: User[];
    offlineUsers: User[] | undefined;
};

export const GroupParticipantList: FC<Props> = ({ offlineUsers, onlineUsers }) => {
    const getFullName = (user: User) => user.lastName + ' ' + user.firstName;
    return (
        <div className="flex flex-col justify-center gap-2 px-2 overflow-y-scroll scrollbar-hide overflow-auto">
            <div className="flex flex-col gap-2 justify-center">
                <div className="text-base font-medium rounded-md">Online</div>
                <div className="flex flex-col gap-2">
                    {onlineUsers?.map((user) => (
                        <div key={user.id} className="flex justify-start items-center text-base gap-4 my-1 font-medium">
                            <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                            <span>{getFullName(user)}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-2 justify-center">
                <div className="text-base font-medium rounded-md">Offline</div>
                <div>
                    {offlineUsers?.map((user) => (
                        <div key={user.id} className="flex justify-start items-center text-base gap-4 my-1 font-medium">
                            <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                            <span>{getFullName(user)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
