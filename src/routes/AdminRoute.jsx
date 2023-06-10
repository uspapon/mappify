import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import useRole from '../hooks/useRole';

const AdminRoute = ({children}) => {
    const { user, loading } = useAuth();
    const [userRole, isUserRoleLoading] = useRole();
    const location = useLocation();

    if(loading || isUserRoleLoading){
        return <progress className="progress w-56"></progress>
    }
    
    if(user && (userRole === 'admin')){
        return children;
    }

    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default AdminRoute;