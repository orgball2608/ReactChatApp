import {TbEdit} from "react-icons/tb";
import {useNavigate} from "react-router-dom";
import { FC } from 'react';
import {ConversationType} from "../../utils/types"

type Props = {
    conversations : ConversationType[]
}
export const ConversationSidebar: FC<Props> = ({conversations}) => {
    const navigate = useNavigate()
    return (
        <aside className="position: absolute top-0 left-0 h-full w-[400px] bg-dark-light border-r-[1px] border-solid border-border-conversations overflow-y-scroll scrollbar-hide overflow-auto">
            <header className="position: fixed top-0 left-0 w-[400px] flex justify-between items-center px-8 bg-dark-header h-[100px] border-b-[1px] border-border-conversations">
                <h1 className="font-normal text-2xl">Conversations</h1>
                <TbEdit size={36} />
            </header>
            <div>
                {conversations && conversations.map((conversation) => (
                        <div className={"flex justify-start items-center gap-5 px-8 py-5 box-border border-b-[1px] border-solid border-border-conversations bg-simple-gray"}
                            onClick={()=>{navigate(`/conversations/${conversation.id}`)}}
                        >
                            <div className="bg-white h-14 w-14 rounded-full"></div>
                           <div>
                                <span className="block font-bold text-base">
                                { conversation.name}
                            </span>
                               <span className="text-sm text-white">
                                {conversation.lastMessage}
                            </span>
                           </div>
                        </div>
                    ))
                }
            </div>

        </aside>
    )
}