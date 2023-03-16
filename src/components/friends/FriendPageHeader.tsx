import { PersonAdd } from 'akar-icons';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { AddNewFriendModal } from '../modals/AddNewFriendModal';

type Props = {
    selectedItem: string;
    setSelectedItem: Dispatch<SetStateAction<string>>;
};

export const FriendPageHeader: FC<Props> = ({ selectedItem, setSelectedItem }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const FriendHeaderItem = [
        { name: 'Friends', path: 'friends' },
        { name: 'Requests', path: 'requests' },
    ];
    return (
        <>
            {showModal && <AddNewFriendModal setShowModal={setShowModal} />}
            <aside className=" flex flex-none justify-between px-2 items-center bg-[#121212] h-14 text-xl border-border-conversations border-b-[1px] border-r-[1px]">
                <div className="flex justify-start items-center cursor-pointer">
                    {FriendHeaderItem.map((item) => (
                        <div key={item.name} onClick={() => setSelectedItem(item.path)} className="px-3">
                            <span
                                className={`py-3 px-1 text-base text-white ${
                                    selectedItem === item.path ? ' border-b-[1px] border-[#b1b1b1]' : ''
                                }`}
                            >
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>
                <div
                    onClick={() => setShowModal(true)}
                    className="py-[6px] px-4 flex gap-2 justify-center items-center bg-[#0162bd] hover:bg-blue-600 text-white rounded-lg cursor-pointer  ease-in-out transform active:scale-110 transition-all duration-300"
                >
                    <PersonAdd size={20} />
                    <span className="text-white text-base">Add</span>
                </div>
            </aside>
        </>
    );
};
