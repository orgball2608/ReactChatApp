import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserCredentialsParams } from '../../utils/types';
import { postLoginUser } from '../../services/api';
import { SocketContext } from '../../contex/SocketContext';

export const LoginForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<UserCredentialsParams>();
    const socket = useContext(SocketContext);
    const FormSubmit = async (data: UserCredentialsParams) => {
        try {
            await postLoginUser(data);
            socket.connect();
            navigate('/conversations');
        } catch (errors) {
            console.log(errors);
        }
    };
    return (
        <>
            <form className="max-w-[600px] w-screen mx-3" onSubmit={handleSubmit(FormSubmit)}>
                <div className="bg-simple-gray py-3 px-4 rounded-lg w-full border-box my-2">
                    <label htmlFor="email" className="block text-label-white text-sm">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register('email', { required: true })}
                        className="text-base w-full border-box p-0 text-white bg-inherit border-0 outline-0"
                    />
                </div>
                <div className="bg-simple-gray py-3 px-4 rounded-lg w-full border-box my-2">
                    <label htmlFor="password" className="block text-label-white text-sm">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        {...register('password', { required: true })}
                        className="text-base w-full border-box p-0  text-white bg-inherit border-0 outline-0"
                    />
                </div>
                <button className="w-full outline-0 border-0 text-base font-medium bg-blue-button text-white rounded-[10px] py-3">
                    Login
                </button>
                <div className="text-center my-2 text-base">
                    <span>Don't have an account? </span>
                    <Link to="/register" className="text-purple-500 underline decoration-solid mx-1">
                        <span>Register</span>
                    </Link>
                </div>
            </form>
        </>
    );
};
