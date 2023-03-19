import { useContext, useEffect, useState } from 'react';
import { CreateConversationModal } from '../modals/conversations/CreateConversationModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ConversationSelected } from '../conversations/ConversationSelected';
import { ConversationSideBarItem } from '../conversations/ConversationSideBarItem';
import { GroupSideBarItem } from '../groups/GroupSideBarItem';
import { ConversationSearchBar } from '../conversations/ConversationSearchBar';
import { useDebounce } from '../../hooks/useDebounce';
// import { searchUsers } from '../../services/api';
import { SearchUserResults } from '../searchs/SearchUserResults';
import { User } from '../../utils/types';
import { AuthContext } from '../../contex/AuthContext';
import { getFriends, searchFriends } from '../../utils/helpers';
import CreateConversationIcon from '../icons/CreateConversationIcon';
import { useCurrentViewportView } from '../../hooks/useCurrentViewportView';

export const ConversationSidebar = () => {
    const [showModal, setShowModal] = useState(false);
    const conversations = useSelector((state: RootState) => state.conversation.conversations);
    const selectedType = useSelector((state: RootState) => state.type.type);
    const groups = useSelector((state: RootState) => state.group.groups);
    const [isSearching, setIsSearching] = useState(false);
    const [query, setQuery] = useState('');
    const [userResults, setUserResults] = useState<User[]>([]);
    const friends = useSelector((state: RootState) => state.friends.friends);
    const { user } = useContext(AuthContext);
    const { isMobile } = useCurrentViewportView();

    const debouncedSearchTerm = useDebounce(query, 1000);

    useEffect(() => {
        if (debouncedSearchTerm) {
            setIsSearching(true);
            const results = getFriends(searchFriends(query, friends, user!), user!);
            setUserResults(results);
            setIsSearching(false);
            // searchUsers(query)
            //     .then(({ data }) => {
            //         setUserResults(data);
            //     })
            //     .catch((err) => console.log(err))
            //     .finally(() => setIsSearching(false));
        }
    }, [debouncedSearchTerm]);

    return (
        <>
            {showModal && <CreateConversationModal setShowModal={setShowModal} />}
            <aside className={`h-full flex-none bg-dark-light w-60 lg:w-80 border-solid border-r-[1px] border-border-conversations ${isMobile && 'w-full flex-1'}`}>
                <header className={`absolute top-0 left-16 lg:w-80 w-60 flex flex-col items-start ${isMobile && `!w-full pr-16`}`}>
                    <div className={`flex justify-between px-3 lg:px-4 items-center h-14 lg:w-80 w-60 ${isMobile && '!w-full'}`}>
                        <h1 className="text-xl">Conversations</h1>
                        <div
                            className="hover:bg-[#686868] p-1 rounded-full flex justify-center items-center bg-[#5a5252] cursor-pointer "
                            onClick={() => setShowModal(!showModal)}
                        >
                            <CreateConversationIcon className="w-7 h-7" color="#ffffff" />
                        </div>
                    </div>
                    <div className={`w-60 lg:w-80 flex flex-col items-start bg-dark-light ${isMobile && `!w-full`}`}>
                        < ConversationSelected/>
                        <ConversationSearchBar
                            setIsSearching={setIsSearching}
                            setQuery={setQuery}
                            query={query}
                            userResults={userResults}
                            setUserResults={setUserResults}
                        />
                    </div>
                </header>
                <div className="w-full h-full pt-38 overflow-y-auto overflow-auto">
                    {userResults.length > 0 || query !== '' ? (
                        <section className=" w-full cursor-pointer">
                            <SearchUserResults userResults={userResults} isSearching={isSearching} />
                        </section>
                    ) : (
                        <section className="w-full h-full flex flex-col gap-1 cursor-pointer overflow-y-auto overflow-auto">
                            {selectedType === 'private'
                                ? conversations.map((conversation) => (
                                      <ConversationSideBarItem conversation={conversation} key={conversation.id} />
                                  ))
                                : groups.map((group) => <GroupSideBarItem group={group} key={group.id} />)}
                        </section>
                    )}
                </div>
            </aside>
        </>
    );
};
