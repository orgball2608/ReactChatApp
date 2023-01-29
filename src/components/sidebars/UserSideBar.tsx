import avatar from '../../__assets__/avatar.jpg';
import { ArrowCycle, ChatDots, Gear, Person, Ribbon, SignOut } from 'akar-icons';
export const UserSideBar = () => {
    return (
        <div className="w-16 flex-none h-full flex flex-col items-center justify-between bg-[#121212] border-r-[1px] border-solid border-border-conversations">
            <div className="flex justify-center items-center flex-col box-border mt-3">
                <img src={avatar} className="w-10 h-10 rounded-full object-cover" alt="avatar cua quang" />
                <hr className="w-full mt-2 h-[2px] text-[#3030303e] border-0" />
                <div className="flex justify-center items-center flex-col gap-6 mt-4">
                    <ChatDots size={26} />
                    <Person size={26} />
                    <Ribbon size={26} />
                    <ArrowCycle size={26} />
                    <Gear size={26} />
                </div>
            </div>
            <div className="flex justify-center items-center flex-col mb-8">
                <SignOut size={24} />
            </div>
        </div>
    );
};
