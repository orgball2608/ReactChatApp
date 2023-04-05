import { useNavigate } from 'react-router-dom';
import logo from '../../__assets__/logo.svg';

const Header = () => {
    const navigation = useNavigate();
    return (
        <section className="flex justify-between items-center">
            <div className="flex justify-center items-center">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="logo" className="md:w-12 md:h-12 h-10 w-10" />
                    <h1 className="text-2xl font-bold text-red-700 hidden md:block">SpeedChat</h1>
                </div>
            </div>
            <div className="flex md:gap-2 items-center">
                <button
                    onClick={() => navigation('/register')}
                    className="text-gray-200 md:text-xl text-lg px-4 py-2 rounded-md"
                >
                    Register
                </button>
                <button
                    onClick={() => navigation('/login')}
                    className="bg-[#2B59FF] md:text-xl text-lg text-white px-4 py-[6px] rounded-lg transition duration-300 hover:brightness-90"
                >
                    Login
                </button>
            </div>
        </section>
    );
};

export default Header;
