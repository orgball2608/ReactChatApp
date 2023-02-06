import { Dispatch, FC, SetStateAction } from 'react';
import { FriendLists } from '../friends/FriendLists';
import { FriendPageHeader } from '../friends/FriendPageHeader';
import { FriendRequests } from '../friends/FriendRequests';

type Props = {
    selectedItem: string;
    setSelectedItem: Dispatch<SetStateAction<string>>;
};

export const FriendSideBar: FC<Props> = ({ selectedItem, setSelectedItem }) => {
    return (
        <div className="flex flex-col w-1/3 h-full border-border-conversations border-r-[1px]">
            {selectedItem === 'requests' && <FriendRequests />}
            {selectedItem === 'friends' && <FriendLists />}
        </div>
    );
};
