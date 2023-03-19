import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate, useParams } from 'react-router-dom';
import { getProfileById } from '../../services/api';
import { User } from '../../utils/types';
import 'react-lazy-load-image-component/src/effects/blur.css';
import avatar from '../../__assets__/default_avatar.jpg';
import banner from '../../__assets__/banner.jpg';
import { ProfileAction } from '../../components/profiles/ProfileAction';
import { SpinLoading } from '../../components/commons/SpinLoading';
import { FaChevronLeft } from 'react-icons/fa';
import { useCurrentViewportView } from '../../hooks/useCurrentViewportView';
import { getDisplayName } from '../../utils/helpers';

export const ProfilePage = () => {
    const { id } = useParams();
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate()
    const { isMobile,isTablet } = useCurrentViewportView();
    useEffect(() => {
        setUser(null);
        getProfileById(parseInt(id!))
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    if (!user)
        return (
            <div className="flex justify-center items-center w-full h-full">
                <SpinLoading />
            </div>
        );

    const profile = user?.profile;
    const handleRedirectProfilePage =( )=>{
        navigate('../../friend')
    }

    return (
        <div className="flex flex-col lg:mx-2 overflow-y-auto overflow-x-hidden w-full relative">
            {(isMobile||isTablet) && (
                <div
                    onClick={handleRedirectProfilePage}
                    className={`rounded-full hover:bg-[#2d3133] flex justify-center items-center bg-white cursor-pointer absolute top-3 left-3 ${isMobile?'p-1':'p-2'}`}>
                    <FaChevronLeft size={isMobile? 20 : 24} className="text-dark-light"/>
                </div>
            )}
            <div className="w-full">
                <LazyLoadImage
                    src={profile.banner || banner}
                    alt="banner"
                    className="w-full object-cover h-60 lg:h-72 rounded-b-xl"
                />
            </div>
            <div className={`flex w-full items-center gap-5 absolute top-48 z-10 left-1/2 transform -translate-x-1/2 justify-center`}>
                <div className={`flex lg:justify-start items-center gap-3 flex-col`}>
                    <LazyLoadImage
                        src={profile.avatar || avatar}
                        alt="avatar"
                        effect="blur"
                        className="w-36 h-36 lg:w-40 lg:h-40 rounded-full object-cover border-[#121212] border-4 flex-none"
                    />
                    <div className="flex flex-col gap-2 justify-center">
                        <p className="lg:text-2xl text-xl font-bold">{getDisplayName(user)}</p>
                        {
                            profile.location && <p className="text-base font-normal text-gray-400">
                            Location: {profile.location || 'Nothing to show'}
                        </p>
                        }

                    </div>
                    <div className="flex justify-center items-center">
                        <ProfileAction />
                    </div>
                </div>
            </div>
            <div className="lg:mt-44 mt-60 ml-4 w-full flex flex-col">
                <label className="text-lg font-semibold my-1">About</label>
                <textarea
                    className="max-w-[300px] w-screen p-4 outline-none border-none bg-[#121212] h-32 resize-none rounded-lg text-sm"
                    defaultValue={profile.bio || 'Nothing to show'}
                />
            </div>
        </div>
    );
};
