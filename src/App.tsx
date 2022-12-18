
import { Route, Routes } from 'react-router-dom';
import {RegisterPage} from './pages/RegisterPage';
import {LoginPage} from './pages/LoginPage';
import {ConversationChannelPage} from './pages/ConversationChanelPage';
import {ConversationPage} from './pages/ConversationPage';
import {NotFoundPage} from './pages/NotFoundPage'
import {AuthenticatedRoute} from './components/AuthenticatedRoute'
function App() {
    return (
       <>
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
       </>
    );
}
export default App;



