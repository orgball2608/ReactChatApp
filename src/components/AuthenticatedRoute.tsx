import React, {FC, useEffect, useState} from "react";
import {useLocation, Navigate} from 'react-router-dom'
import {User} from "../utils/types";
import {getAuthUser} from "../utils/api";

function useAuth()
{
    const [user,setUser] = useState<User|undefined>()
    const [loading, setLoading] = useState(true);
    const controller = new AbortController();

    useEffect(() =>{
        setLoading(true);
        getAuthUser()
            .then(({ data }) => {
                console.log(data);
                setUser(data);
                setTimeout(() => setLoading(false), 1000);
            })
            .catch((err) => {
                console.log(err);
                setTimeout(() => setLoading(false), 1000);
            });
        return () => {
            controller.abort()
        }
    },[])
    return {user, loading}
}


export const AuthenticatedRoute: FC<React.PropsWithChildren> =({children}) =>
{
    const location = useLocation()

    const {user, loading} = useAuth()
    if (loading) {
        return <div>loading</div>;
    }
    if (user) return <>{children}</>;
    return <Navigate to="/login" state={{ from: location }} replace />;

}