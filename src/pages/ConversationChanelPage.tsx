import { useContext } from 'react';
import { AuthContext } from '../contex/AuthContext';
export const  ConversationChannelPage = () =>
{
    const {user} =useContext(AuthContext);
    return (
        <div className="h-full ml-[300px]">
            {user && user.email}
        </div>
    )

}