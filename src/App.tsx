
import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
function App() {
    return (
       <>
           <h1 className="text-3xl font-bold underline">
               Hello world!
           </h1>
              <Routes>
                    <Route path="/" element={<Outlet />} />
                    <Route path="*" element={<h1>404</h1>} />
              </Routes>
       </>
    );
}
export default App;



