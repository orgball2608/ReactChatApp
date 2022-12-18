import { Route, Routes } from 'react-router-dom';
import {RegisterPage} from './pages/RegisterPage';
import {LoginPage} from './pages/LoginPage';
import {ConversationChannelPage} from './pages/ConversationChanelPage';
import {ConversationPage} from './pages/ConversationPage';
import {NotFoundPage} from './pages/NotFoundPage'
import {AuthenticatedRoute} from './components/AuthenticatedRoute'
import {AuthContext} from './contex/AuthContext'
import {useState} from "react";
import {User} from "./utils/types";
function App() {
    const [user, setUser] = useState<User>();
    return (
       <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
           <Routes>
               <Route path="/register" element={<RegisterPage />} />
               <Route path="/login" element={<LoginPage />} />
               <Route path="/conversations" element={
                   <AuthenticatedRoute>
                       <ConversationPage/>
                   </AuthenticatedRoute>
               }/>
               <Route path="/conversations/:id" element={<ConversationChannelPage/>}/>
               <Route path="*" element={<NotFoundPage/>}/>
           </Routes>
       </AuthContext.Provider>
    );
}
export default App;



