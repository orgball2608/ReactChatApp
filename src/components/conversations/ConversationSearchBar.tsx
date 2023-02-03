import { Search } from 'akar-icons';

export const ConversationSearchBar = () => {
    return (
        <div className="w-80 flex justify-center items-center h-12 bg-simple-gray border-r-[1px] border-border-conversations">
            <div className="w-full relative mx-2 flex justify-start items-center">
                <input
                    placeholder="Search for Conversations..."
                    className="rounded-2xl px-4 pl-8 py-1 bg-[#202020] w-full mx-2 outline-0 text-[#6b6b6b] box-border border-0"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Search size={20} />
                </div>
            </div>
        </div>
    );
};
