
import { Route, Routes } from 'react-router-dom';
import {RegisterPage} from './pages/RegisterPage';
import {LoginPage} from './pages/LoginPage';
function App() {
    return (
       <>
           <Routes>
               <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
           </Routes>
       </>
    );
}
export default App;



