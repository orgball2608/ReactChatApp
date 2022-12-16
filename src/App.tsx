
import { Route, Routes } from 'react-router-dom';
import {RegisterPage} from './pages/RegisterPage';
import {LoginPage} from './pages/LoginPage';
import {ConversationChannelPage} from './pages/ConversationChanelPage';
import {ConversationPage} from './pages/ConversationPage';
function App() {
    return (
       <>
           <Routes>
               <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
               <Route path="/conversations" element={<ConversationPage/>} />
              <Route path="/conversations/:id" element={<ConversationChannelPage/>}/>
           </Routes>
       </>
    );
}
export default App;



