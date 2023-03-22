import { defaultAvatar, SelectedPageTypes } from '../../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { changePage } from '../../store/selectedPageSlice';
import { SelectedPageType } from '../../utils/types';
import { getUserSideBarIcon } from '../../utils/helpers';
import { FC, useContext, useState } from 'react';
import Tippy from '@tippyjs/react';
import { AuthContext } from '../../contex/AuthContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FriendRequestBadge } from '../friends/FriendRequestBadge';
import { UserMenuContext } from '../menu-context/UserMenuContext';
import logo from '../../__assets__/logo.svg';

export const UserSideBar = () => {
    const navigate = useNavigate();
    const selectedPage = useSelector((state: RootState) => state.selectedPage.page);
    const dispatch = useDispatch<AppDispatch>();
    const [visible, setVisible] = useState(false);
    const { user } = useContext(AuthContext);
    const { profile } = user!;

    type CustomIconProps = {
        page: SelectedPageType;
        className: string;
    };

    const CustomIcon: FC<CustomIconProps> = ({ page,className }) => {
        const { icon: MyIcon } = getUserSideBarIcon(page);
        return <MyIcon className={`w-7 h-7 text-[#A7AFB1] ${className}`} />;
    };

    const getAvatar = () => {
        if (profile?.avatar) return profile?.avatar;
        return defaultAvatar;
    };

    return (
        <div className="w-16 flex-none h-full flex flex-col items-center justify-between border-r-[1px] border-solid border-border-conversations bg-sidebar-background">
            <div className=" w-full flex justify-center items-center flex-col box-border mt-4">
                <Link to="/conversations"
                    className="flex justify-center items-center">
                    <LazyLoadImage
                        src={logo}
                        className="w-9 h-7 object-cover cursor-pointer"
                        alt="avatar cua quang"
                    />
                </Link>
                <div className="w-full flex mx-1 justify-center items-center flex-col gap-4 mt-5 cursor-pointer">
                    {SelectedPageTypes.map((page) => (
                        <div
                            key={page.page}
                            className="w-12 h-12 relative flex justify-center items-center rounded-md hover:bg-dark-lighten"
                            onClick={() => {
                                navigate(`/${page.page}`);
                                dispatch(changePage(page.page));
                            }}
                        >
                            <div className="flex flex-col justify-center items-center">
                                <CustomIcon page={page.page} className={`${
                                    page.page === selectedPage
                                        ? '!text-[#0084ff]'
                                        : ''
                                }`} />
                                <p className={`text-gray-400 font-medium text-xs ${
                                    page.page === selectedPage
                                        ? '!text-white'
                                        : ''
                                }`}>{page.action}</p>
                            </div>

                            {page.page === 'friends' && <FriendRequestBadge />}
                        </div>
                    ))}
                </div>
            </div>
            <Tippy
                visible={visible}
                onClickOutside={() => setVisible(false)}
                content={visible && <UserMenuContext setVisible={setVisible} />}
                placement="top-end"
                interactive={true}
                animation="fade"
                theme="user_option"
            >
                <div
                    onClick={()=>setVisible((prev)=>!prev)}
                    className="flex justify-center items-center">
                    <LazyLoadImage
                        src={getAvatar()}
                        className="w-8 h-8 rounded-full object-cover mb-6 cursor-pointer"
                        alt="avatar cua quang"
                    />
                </div>
            </Tippy>
        </div>
    );
};
