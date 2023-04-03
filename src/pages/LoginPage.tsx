import { LoginForm } from '../components/forms/LoginForm';
import logo from '../__assets__/logo.svg';
export const LoginPage = () => {
    return (
        <div className="flex flex-col gap-2 justify-center items-center h-full w-full">
            <div className="mb-5 flex flex-col justify-center items-center gap-2">
                <img id="logo" src={logo} alt="logo" className="w-16 h-16" />
                <span className='font-semibold text-2xl text-red-600'>SpeedChat</span>
            </div>
            <LoginForm />
        </div>
    );
};
