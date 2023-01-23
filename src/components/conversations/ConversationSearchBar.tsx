export const ConversationSearchBar = () => {
    return (
        <div className="w-full flex justify-center items-center h-12 bg-simple-gray ">
            <input
                placeholder="Search for Conversations..."
                className="rounded-2xl px-4 py-1 bg-[#202020] w-full mx-2 outline-0 text-[#6b6b6b] box-border border-0"
            />
        </div>
    );
};