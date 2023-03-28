import NoChat from '../commons/NoChat';

export const FriendPanel = () => {
    return (
    <div className="h-full w-full flex flex-col justify-center items-center">
        <NoChat color="#0084ff"/>
        <p className="text-xl">Select a friend to view profile
        </p>
    </div>
    );
};
