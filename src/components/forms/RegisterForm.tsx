import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CreateUserParams } from '../../utils/types';
import { postRegisterUser } from '../../services/api';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useCurrentViewportView } from '../../hooks/useCurrentViewportView';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useState } from 'react';

export const RegisterForm = () => {
    const { isMobile, isTablet } = useCurrentViewportView();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const LoginSchema = Yup.object().shape({
        firstName: Yup.string().required('First name required'),
        lastName: Yup.string().required('Last name required'),
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(18, 'Password must min 18 characters'),
    });

    const {
        reset,
        setError,
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<CreateUserParams>({
        resolver: yupResolver(LoginSchema),
    });

    const FormSubmit = async (data: CreateUserParams) => {
        try {
            await postRegisterUser(data);
        } catch (errors) {
            reset();
        }
    };

    return (
        <section>
            <form className="max-w-[550px] w-screen mx-3" onSubmit={handleSubmit(FormSubmit)}>
                <div className="bg-simple-gray py-2 px-4 rounded-lg w-full border-box">
                    <label htmlFor="email" className="block text-label-white text-sm">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register('email', { required: true })}
                        className="text-lg w-full border-box p-0  text-white bg-inherit border-0 outline-0"
                    />
                </div>
                <section className={`w-full flex justify-between gap-2 my-2 ${(isMobile || isTablet) && 'flex-col'}`}>
                    <div className="bg-simple-gray py-2 px-4 rounded-lg w-full border-box">
                        <label htmlFor="firstName" className="block text-label-white text-sm">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            {...register('firstName', { required: true })}
                            className="text-lg w-full border-box p-0  text-white bg-inherit border-0 outline-0"
                        />
                    </div>
                    <div className="bg-simple-gray py-2 px-4 rounded-lg w-full border-box">
                        <label htmlFor="lastName" className="block text-label-white text-sm">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            {...register('lastName', { required: true })}
                            className="text-lg w-full border-box p-0  text-white bg-inherit border-0 outline-0"
                        />
                    </div>
                </section>

                <div className="bg-simple-gray py-2 px-4 rounded-[10px] w-full border-box mb-2">
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
                    className="w-full text-white mt-2 font-medium rounded-lg text-lg px-5 py-2 text-center bg-[#2563eb] hover:bg-[#1d4ed8] focus:ring-[#1e40af]"
                >
                    Create Account
                </button>
                <div className="text-center my-2 text-base">
                    <span>Already have an account? </span>
                    <Link to="/login" className="text-purple-500 underline decoration-solid mx-1">
                        <span>Login</span>
                    </Link>
                </div>
            </form>
        </section>
    );
};
