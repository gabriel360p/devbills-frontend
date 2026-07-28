import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoutes = () => {
    const { authState } = useAuth();

    //verificando se o usuário esta logado, 
    if (!authState.user) return <Navigate to='/login' replace />

    return <Outlet />


}

export default PrivateRoutes;
