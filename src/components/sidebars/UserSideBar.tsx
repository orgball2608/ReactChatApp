import avatar from '../../__assets__/avatar.jpg';
import { ArrowCycle, ChatDots, Gear, Person, Ribbon, SignOut } from 'akar-icons';
import { SelectedPageTypes } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { changePage } from '../../store/selectedPageSlice';
export const UserSideBar = () => {
    const navigate = useNavigate();
    const selectedPage = useSelector((state: RootState) => state.selectedPage.page);
    const dispatch = useDispatch<AppDispatch>();
    return (
        <div className="w-16 flex-none h-full flex flex-col items-center justify-between bg-[#121212] border-r-[1px] border-solid border-border-conversations">
            <div className=" w-full flex justify-center items-center flex-col box-border mt-3">
                <img src={avatar} className="w-10 h-10 rounded-full object-cover" alt="avatar cua quang" />
                <hr className="w-full mt-2 h-[2px] text-[#3030303e] border-0" />
                <div className="w-full flex justify-center items-center flex-col gap-3 mt-4">
                    <div
                        className={`w-full p-2 flex justify-center items-center ${
                            SelectedPageTypes[0].type === selectedPage
                                ? ' bg-[#b1b1b1] border-r-[3px] border-[#4a23e6] text-black '
                                : ''
                        }}`}
                        onClick={() => {
                            navigate(`/${SelectedPageTypes[0].type}`);
                            dispatch(changePage(SelectedPageTypes[0].type));
                        }}
                    >
                        <ChatDots size={26} />
                    </div>

                    <div
                        className={`w-full p-2 flex justify-center items-center ${
                            SelectedPageTypes[1].type === selectedPage
                                ? ' bg-[#b1b1b1] border-r-[3px] border-[#4a23e6] text-black '
                                : ''
                        }}`}
                        onClick={() => {
                            navigate(`/${SelectedPageTypes[1].type}`);
                            dispatch(changePage(SelectedPageTypes[1].type));
                        }}
                    >
                        <Person size={26} />
                    </div>

                    <div
                        className={`w-full p-2 flex justify-center items-center ${
                            SelectedPageTypes[2].type === selectedPage
                                ? ' bg-[#b1b1b1] border-r-[3px] border-[#4a23e6] text-black '
                                : ''
                        }}`}
                        onClick={() => {
                            navigate(`/${SelectedPageTypes[2].type}`);
                            dispatch(changePage(SelectedPageTypes[2].type));
                        }}
                    >
                        <Ribbon size={26} />
                    </div>

                    <div
                        className={`w-full p-2 flex justify-center items-center ${
                            SelectedPageTypes[3].type === selectedPage
                                ? ' bg-[#b1b1b1] border-r-[3px] border-[#4a23e6] text-black '
                                : ''
                        }}`}
                        onClick={() => {
                            navigate(`/${SelectedPageTypes[3].type}`);
                            dispatch(changePage(SelectedPageTypes[3].type));
                        }}
                    >
                        <ArrowCycle size={26} />
                    </div>

                    <div
                        className={`w-full p-2 flex justify-center items-center  ${
                            SelectedPageTypes[4].type === selectedPage
                                ? ' bg-[#b1b1b1] border-r-[3px] border-[#4a23e6] text-black '
                                : ''
                        }}`}
                        onClick={() => {
                            navigate(`/${SelectedPageTypes[4].type}`);
                            dispatch(changePage(SelectedPageTypes[4].type));
                        }}
                    >
                        <Gear size={26} />
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center flex-col mb-8">
                <SignOut size={24} />
            </div>
        </div>
    );
};
