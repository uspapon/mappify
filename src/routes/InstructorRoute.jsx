import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import useRole from '../hooks/useRole';

const InstructorRoute = ({children}) => {
    const { user, loading } = useAuth();
    const [userRole, isUserRoleLoading] = useRole();
    const location = useLocation();

    if(loading || isUserRoleLoading){
        return <progress className="progress w-56"></progress>
    }
    
    if(user && (userRole === 'instructor')){
        return children;
    }

    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default InstructorRoute;