import Header from '../components/landing/Header';
import background from '../__assets__/background.png';
import ellipse1 from '../__assets__/ellipses/Ellipse1.png';
import ellipse2 from '../__assets__/ellipses/Ellipse2.png';
import ellipse3 from '../__assets__/ellipses/Ellipse3.png';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="mx-[5vw] my-5 flex justify-center lg:my-6">
            <div className="w-full max-w-[1100px]">
                <Header />
                <div className="flex justify-center w-full items-center md:mt-8 lg:mt-16 mb-10">
                    <div className="w-full flex flex-col-reverse lg:flex-row lg:gap-8 lg:justify-between justify-center items-center">
                        <div className="flex flex-1 flex-col items-center lg:items-start gap-6 mt-4 md:mt-16 lg:mt-0">
                            <h1 className="md:text-[42px] text-3xl text-center lg:text-left text-gray-100 font-bold md:leading-10">
                                Start chatting with customers, anywhere anytime with applacation
                            </h1>
                            <span className="md:text-xl font-medium text-center lg:text-left">
                                Great software that allows you to chat from any place at any time without any
                                interruption.
                            </span>
                            <Link to="/conversations" className="bg-[#2B59FF] w-[173px] text-white text-lg px-4 py-2 rounded-lg transition duration-300 hover:brightness-90">
                                Start chatting now
                            </Link>
                            <div className="flex justify-between items-center gap-8">
                                <div className="w-28 h-12 relative">
                                    <img
                                        src={ellipse1}
                                        alt="ellipse"
                                        className="w-12 h-12 absolute top-1/2 left-0 transform -translate-y-1/2"
                                    />
                                    <img
                                        src={ellipse2}
                                        alt="ellipse"
                                        className="w-12 h-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                    />
                                    <img
                                        src={ellipse3}
                                        alt="ellipse"
                                        className="w-12 h-12 absolute top-1/2 right-0 transform -translate-y-1/2"
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="text-lg font-bold">2,291</p>
                                    <p className="text-base font-medium">Happy customers</p>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="text-lg font-bold">4.8/5</p>
                                    <p className="text-base font-medium">Rating</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <img src={background} alt="background" className="w-full h-fit" />
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
};

export default LandingPage;
