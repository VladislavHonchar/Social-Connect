import { useSelector } from "react-redux";

export function useAuth(){
    const {email, token, id} = useSelector(state => state.user);

    return {
        istAuth: !!email,
        email,
        token,
        id
    }
}