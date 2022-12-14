export const RegisterForm = () => {
    return (
        <>
            <form className="w-[800px]">
                <div className="bg-simple-gray py-3 px-4 rounded-[10px] w-full border-box">
                    <label htmlFor="email" className="block text-label-white text-[14px] px-[14px]">Email</label>
                    <input type="email" id="email" className="text-[18px] w-full border-box p-0 my-1 text-white bg-inherit border-0 outline-0" />
                </div>
                <section className="w-full flex justify-between my-2 gap-2">
                    <div className="bg-simple-gray py-3 px-4 rounded-[10px] w-full border-box">
                        <label htmlFor="firstName" className="block text-label-white text-[14px] px-[14px]">First Name</label>
                        <input type="text" id="firstName" className="text-[18px] w-full border-box p-0 my-1 text-white bg-inherit border-0 outline-0" />
                    </div>
                    <div className="bg-simple-gray py-3 px-4 rounded-[10px] w-full border-box">
                        <label htmlFor="lastName" className="block text-label-white text-[14px] px-[14px]">Last Name</label>
                        <input type="text" id="lastName" className="text-[18px] w-full border-box p-0 my-1 text-white bg-inherit border-0 outline-0" />
                    </div>
                </section>

                <div className="bg-simple-gray py-3 px-4 rounded-[10px] w-full border-box">
                    <label htmlFor="password" className="block text-label-white text-[14px] px-[14px]">Password</label>
                    <input type="password" id="password" className="text-[18px] w-full border-box p-0 my-1 text-white bg-inherit border-0 outline-0" />
                </div>
                <button className="my-2 w-full outline-0 border-0 text-[16px] bg-blue-button text-white rounded-[10px] py-6">
                    Create Account
                </button>
            </form>

        </>
    )
}