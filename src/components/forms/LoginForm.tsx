import React from "react";
import {Link} from "react-router-dom";

export const LoginForm = () => {
    const FormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }
    return (
        <>
            <form className="w-[800px]" onSubmit ={FormSubmit}>
                <div className="bg-simple-gray py-3 px-4 rounded-[10px] w-full border-box my-2">
                    <label htmlFor="email" className="block text-label-white text-[16px] px-[14px]">Username</label>
                    <input type="email" id="email" className="text-[18px] w-full border-box p-0 my-1 text-white bg-inherit border-0 outline-0" />
                </div>
                <div className="bg-simple-gray py-3 px-4 rounded-[10px] w-full border-box my-2">
                    <label htmlFor="password" className="block text-label-white text-[16px] px-[14px]">Password</label>
                    <input type="password" id="password" className="text-[18px] w-full border-box p-0 my-1 text-white bg-inherit border-0 outline-0" />
                </div>
                <button className="w-full outline-0 border-0 text-[20px] bg-blue-button text-white rounded-[10px] py-6" >
                    Login
                </button>
                <div  className="text-center my-[10px] text-[20px]">
                    <span>Don't have an account? </span>
                    <Link to="/register" className='text-purple-500 underline decoration-solid mx-1'>
                        <span>Register</span>
                    </Link>
                </div>
            </form>

        </>
    )
}