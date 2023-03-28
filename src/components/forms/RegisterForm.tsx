import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CreateUserParams } from '../../utils/types';
import { postRegisterUser } from '../../services/api';

export const RegisterForm = () => {
    const { register, handleSubmit } = useForm<CreateUserParams>();
    const FormSubmit = async (data: CreateUserParams) => {
        try {
            await postRegisterUser(data);
        } catch (errors) {
            console.log(errors);
        }
    };
    return (
        <form className="max-w-[600px] w-screen mx-3" onSubmit={handleSubmit(FormSubmit)}>
            <div className="bg-simple-gray py-3 px-4 rounded-lg w-full border-box">
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
            <section className="w-full flex justify-between gap-2">
                <div className="bg-simple-gray py-3 px-4 rounded-lg w-full border-box my-2">
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
                <div className="bg-simple-gray py-3 px-4 rounded-lg w-full border-box my-2">
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

            <div className="bg-simple-gray py-3 px-4 rounded-[10px] w-full border-box mb-2">
                <label htmlFor="password" className="block text-label-white text-sm">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    {...register('password', { required: true })}
                    className="text-lg w-full border-box p-0  text-white bg-inherit border-0 outline-0"
                />
            </div>
            <button className="w-full outline-0 border-0 text-lg font-semibold bg-blue-button text-white rounded-[10px] py-[10px]">
                Create Account
            </button>
            <div className="text-center my-[10px] text-base">
                <span>Already have an account? </span>
                <Link to="/login" className="text-purple-500 underline decoration-solid mx-1">
                    <span>Login</span>
                </Link>
            </div>
        </form>
    );
};
