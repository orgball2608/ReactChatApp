import { PersonAdd } from 'akar-icons';
import { Dispatch, FC, SetStateAction } from 'react';
type Props = {
    selectedItem: string;
    setSelectedItem: Dispatch<SetStateAction<string>>;
};

export const FriendPageHeader: FC<Props> = ({ selectedItem, setSelectedItem }) => {
    const FriendHeaderItem = [
        { name: 'Friends', path: 'friends' },
        { name: 'Requests', path: 'requests' },
        { name: 'Blocks', path: 'blocks' },
    ];
    return (
        <nav className=" flex justify-between px-10 items-center bg-[#121212] h-14 text-xl border-border-conversations border-b-[1px]">
            <div className="flex justify-start items-center">
                {FriendHeaderItem.map((item) => (
                    <div
                        key={item.name}
                        onClick={() => setSelectedItem(item.path)}
                        className={`py-3 px-4 font-medium text-white ${
                            selectedItem === item.path ? ' border-b-[1px] border-[#b1b1b1]' : ''
                        }`}
                    >
                        <div>{item.name}</div>
                    </div>
                ))}
            </div>
            <div className="py-2 px-3 flex gap-2 justify-center items-center text-sm bg-blue-800 rounded-lg">
                <PersonAdd size={20} />
                <span>Add Friend</span>
            </div>
        </nav>
    );
};
