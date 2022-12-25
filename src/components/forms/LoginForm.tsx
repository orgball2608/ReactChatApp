import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserCredentialsParams } from '../../utils/types';
import { postLoginUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<UserCredentialsParams>();
    const FormSubmit = async (data: UserCredentialsParams) => {
        try {
            await postLoginUser(data);
            navigate('/conversations');
        } catch (errors) {
            console.log(errors);
        }
    };
    return (
        <>
            <form className="w-[600px]" onSubmit={handleSubmit(FormSubmit)}>
                <div className="bg-simple-gray py-3 px-4 rounded-[10px] w-full border-box my-2">
                    <label htmlFor="email" className="block text-label-white text-sm px-[14px]">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register('email', { required: true })}
                        className="text-base w-full border-box p-0 text-white bg-inherit border-0 outline-0"
                    />
                </div>
                <div className="bg-simple-gray py-3 px-4 rounded-[10px] w-full border-box my-2">
                    <label htmlFor="password" className="block text-label-white text-sm px-[14px]">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        {...register('password', { required: true })}
                        className="text-base w-full border-box p-0  text-white bg-inherit border-0 outline-0"
                    />
                </div>
                <button className="w-full outline-0 border-0 text-[20px] bg-blue-button text-white rounded-[10px] py-3">
                    Login
                </button>
                <div className="text-center my-[10px] text-lg">
                    <span>Don't have an account? </span>
                    <Link to="/register" className="text-purple-500 underline decoration-solid mx-1">
                        <span>Register</span>
                    </Link>
                </div>
            </form>
        </>
    );
};
