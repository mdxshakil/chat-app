import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

const useAuthCheck = () => {
    const dispatch = useDispatch();
    const [authChecked, setAuhtChecked] = useState(false)

    useEffect(() => {
        const localAuth = localStorage?.getItem("auth");
        if (localAuth) {
            const auth = JSON.parse(localAuth);
            if (auth?.accessToken && auth?.user) {
                //means user is logged in
                dispatch(userLoggedIn({
                    accessToken: auth.accessToken,
                    user: auth.user,
                }))
            }
        };
        setAuhtChecked(true);
    }, [dispatch])

    return authChecked;
}

export default useAuthCheck