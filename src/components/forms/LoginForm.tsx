import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserCredentialsParams } from '../../utils/types';
import { postLoginUser } from '../../services/api';
import { SocketContext } from '../../contex/SocketContext';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const LoginForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const socket = useContext(SocketContext);

    const LoginSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
        password: Yup.string().required('Password is required'),
    });

    const {
        reset,
        setError,
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<UserCredentialsParams>({
        resolver: yupResolver(LoginSchema),
    });

    const FormSubmit = async (data: UserCredentialsParams) => {
        try {
            await postLoginUser(data);
            socket.connect();
            navigate('/conversations');
        } catch (error: any) {
            console.log(error);
            reset();
            setError('email', {
                message: error.message,
            });
        }
    };
    return (
        <section>
            <form className="max-w-[550px] w-screen mx-3" onSubmit={handleSubmit(FormSubmit)}>
                <div className="bg-simple-gray py-2 px-4 rounded-lg w-full border-box my-2">
                    <label htmlFor="email" className="block text-label-white text-sm">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register('email')}
                        name="email"
                        className="text-lg w-full border-box text-white bg-inherit border-0 outline-0"
                    />
                </div>
                <div className="bg-simple-gray py-2 px-4 rounded-lg w-full border-box my-2">
                    <label htmlFor="password" className="block text-label-white text-sm">
                        Password
                    </label>
                    <div className="w-full relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            {...register('password')}
                            name="password"
                            className="text-lg w-full border-box p-0  text-white bg-inherit border-0 outline-0"
                        />
                        <div className="absolute top-1/2 transform -translate-y-1/2 right-0 z-50">
                            {showPassword ? (
                                <AiFillEyeInvisible onClick={() => setShowPassword(false)} cursor="pointer" size={22} />
                            ) : (
                                <AiFillEye onClick={() => setShowPassword(true)} cursor="pointer" size={22} />
                            )}
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full mt-2 text-white font-medium rounded-lg text-lg px-5 py-2 text-center bg-[#2563eb] hover:bg-[#1d4ed8] focus:ring-[#1e40af]"
                >
                    Login
                </button>
                <div className="text-center my-2 text-base">
                    <span>Don't have an account? </span>
                    <Link to="/register" className="text-purple-500 underline decoration-solid mx-1">
                        <span>Register</span>
                    </Link>
                </div>
            </form>
        </section>
    );
};
