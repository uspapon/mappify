import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(res => {
                const loggedUser = res.user;
                console.log(loggedUser);
                console.log("successful google login");

                const userData = {name: loggedUser.displayName, email: loggedUser.email, photo: loggedUser.photoURL, role:'student'}

                fetch("http://localhost:5000/users", {
                    method: 'POST',
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(userData)
                })
                    .then(res => res.json())
                    .then(() => {
                         navigate('/');
                        
                    })

                    navigate(from, {replace: true});
                
            })
            .catch(error => console.log(error))

    }
    return (
        <div>
            <div className="divider w-2/3 mx-auto text-cyan-500">OR</div>
            <div className="text-center">
                <div className='mb-3'>Login with Google here </div>
                <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline text-cyan-500 hover:bg-cyan-500 hover:border-none">
                    <FaGoogle></FaGoogle>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;