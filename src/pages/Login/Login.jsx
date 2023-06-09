import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/'

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
        signIn(data.email, data.password)
        .then(res => {
            const loggedUser = res.user;
            console.log("logged user: ", loggedUser)
            Swal.fire({
                title: 'User Login Successful!',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })

            navigate(from, {replace:true});
        })
        .catch(error => console.log(error))
        

    }
    console.log(errors);

    
    return (
        <div>
            <h2 className='text-4xl font-semibold text-center mt-8 mb-4'>Please Login Here</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='w-2/3 mx-auto bg-cyan-50 p-10 rounded-xl border-2 border-cyan-400'>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Your Email</span>
                    </label>

                    <input type="text" placeholder="email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} className="input input-bordered border-cyan-500" />

                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Password</span>
                    </label>

                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} placeholder="password" {...register("password", { required: true, min: 6, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6}/i })} className="input input-bordered border-cyan-500 w-full" />
                        <p className='absolute top-5 right-3' onClick={() => setShowPassword(!showPassword)}><small>
                            {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                        </small>
                        </p>
                    </div>
                </div>
                <input type="submit" value="Login" className='btn btn-ghost bg-sky-300 font-bold text-white my-3' />
                
            </form>
            <SocialLogin></SocialLogin>

            <div className='px-6 pt-3 pb-10 text-center'>
                Do not have an account? Please <Link to="/register"><span className='text-cyan-500'>Register</span></Link> here.
            </div>

        </div>
    );
};

export default Login;