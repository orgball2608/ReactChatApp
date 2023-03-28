import { Dispatch, FC, SetStateAction, useState } from 'react';
import { AddNewFriendModal } from '../modals/AddNewFriendModal';
import { BsFillPersonPlusFill } from 'react-icons/bs';

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
            <aside className=" flex flex-none justify-between px-2 items-center bg-dark-gray h-14 text-xl border-border-conversations border-b-[1px] border-r-[1px]">
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
                    className="py-2 pl-2 pr-4 flex gap-[6px] mr-2 justify-center items-center bg-[#0162bd] hover:bg-blue-600 text-white rounded-md cursor-pointer  ease-in-out transform active:scale-110 transition-all duration-300"
                >
                    <BsFillPersonPlusFill size={20} />
                    <span className="text-white text-sm font-semibold">Add</span>
                </div>
            </aside>
        </>
    );
};
