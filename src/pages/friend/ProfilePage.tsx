import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useParams } from 'react-router-dom';
import { getProfileById } from '../../services/api';
import { User } from '../../utils/types';
import 'react-lazy-load-image-component/src/effects/blur.css';
import avatar from '../../__assets__/default_avatar.jpg';
import banner from '../../__assets__/banner.jpg';
import { ProfileAction } from '../../components/profiles/ProfileAction';
import { SpinLoading } from '../../components/commons/SpinLoading';

export const ProfilePage = () => {
    const { id } = useParams();
    const [user, setUser] = useState<User | null>(null);
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
    const getFullName = () => {
        return `${user?.firstName} ${user?.lastName}`;
    };
    return (
        <div className="flex flex-col mx-16 overflow-y-auto overflow-x-hidden w-full relative">
            <div className="w-full">
                <LazyLoadImage
                    src={profile.banner || banner}
                    alt="banner"
                    className="w-full object-cover h-56 rounded-b-xl"
                />
            </div>
            <div className="flex justify-between w-full items-center gap-5 absolute top-48 z-10 left-5">
                <div className="flex justify-start gap-5">
                    <LazyLoadImage
                        src={profile.avatar || avatar}
                        alt="avatar"
                        effect="blur"
                        className="w-36 flex-none h-36 rounded-full object-cover border-[#121212] border-4"
                    />
                    <div className="flex flex-col gap-4 justify-center">
                        <span className="text-2xl font-bold">{getFullName()}</span>
                        <span className="text-base font-semibold">
                            Location: {profile.location || 'Nothing to show'}
                        </span>
                    </div>
                </div>
                <ProfileAction />
            </div>
            <div className="mt-32 w-full flex flex-col">
                <label className="text-md font-bold my-1">About</label>
                <textarea
                    className="w-1/2 p-4 outline-none border-none bg-[#121212] h-32 resize-none rounded-lg"
                    defaultValue={profile.bio || 'Nothing to show'}
                />
            </div>
        </div>
    );
};
