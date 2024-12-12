import { useTypedSelector } from "@/store/store";
import { Navigate } from "react-router";

export default function ProtectedRoute({children}: {children: React.ReactNode}) {
    const isAuth = useTypedSelector(state=> state.auth.authenticate)
    const user = useTypedSelector(state=> state.auth.user)
    const isAdmin = user?.role === 'admin'
    if(!isAuth || !isAdmin){
        return <Navigate to={'/'} replace/>
    }
    return children
}
