import avatar from '../../__assets__/avatar.jpg';
import { SignOut } from 'akar-icons';
import { SelectedPageTypes } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { changePage } from '../../store/selectedPageSlice';
import { SelectedPageType } from '../../utils/types';
import { getUserContextMenuIcon } from '../../utils/helpers';
import { FC } from 'react';
export const UserSideBar = () => {
    const navigate = useNavigate();
    const selectedPage = useSelector((state: RootState) => state.selectedPage.page);
    const dispatch = useDispatch<AppDispatch>();

    type CustomIconProps = {
        page: SelectedPageType;
    };

    const CustomIcon: FC<CustomIconProps> = ({ page }) => {
        const { icon: MyIcon } = getUserContextMenuIcon(page);
        return <MyIcon size={26} />;
    };

    return (
        <div className="w-16 flex-none h-full flex flex-col items-center justify-between bg-[#121212] border-r-[1px] border-solid border-border-conversations">
            <div className=" w-full flex justify-center items-center flex-col box-border mt-3">
                <img src={avatar} className="w-10 h-10 rounded-full object-cover" alt="avatar cua quang" />
                <hr className="w-full mt-2 h-[2px] text-[#3030303e] border-0" />
                <div className="w-full flex justify-center items-center flex-col gap-3 mt-4">
                    {SelectedPageTypes.map((page) => (
                        <div
                            key={page.page}
                            className={`w-full p-2 flex justify-center items-center ${
                                page.page === selectedPage
                                    ? ' bg-[#b1b1b1] border-r-[3px] border-[#4a23e6] text-black '
                                    : ''
                            }}`}
                            onClick={() => {
                                navigate(`/${page.page}`);
                                dispatch(changePage(page.page));
                            }}
                        >
                            <CustomIcon page={page.page} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center items-center flex-col mb-8">
                <SignOut size={24} />
            </div>
        </div>
    );
};
