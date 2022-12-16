import {TbEdit} from "react-icons/tb";
export const ConversationSidebar = () => {
    return (
        <aside className="position: absolute top-0 left-0 h-full w-[400px] bg-dark-light border-r-[1px] border-solid border-border-conversations">
            <header className="flex justify-between content-center px-6 bg-dark-header h-[100px] border-bottom-[1px] border-border-conversations">
                <h1 className="font-normal text-2xl">Conversations</h1>
                <TbEdit size={36} />
            </header>

        </aside>
    )
}