import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Register = () => {
    const [error, setError] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfPass, setShowConfPass] = useState(false);
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const onSubmit = data => {
        setError('');
        console.log(data);

        if (data.password !== data.confirmPassword) {
            setError("password does not match");
            return;
        }

        createUser(data.email, data.password)
            .then(result => {
                
                const newUser = result.user;
                console.log("new user:", newUser);

                if (newUser) {
                    updateUserProfile(data.name, data.photoURL)
                        .then(result => {
                            const userData = {name: data.name, email: data.email, photo:data.photoURL, role:'student' }
                            
                            
                            fetch("http://localhost:5000/users", {
                                method: 'POST',
                                headers: {
                                    "content-type": "application/json"
                                },
                                body: JSON.stringify(userData)
                            })
                            .then(res => res.json())
                            .then(data => {
                                if(data.insertedId){
                                    setError('');
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User has been Created Successfully',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                }
                            })

                            
                        })

                        navigate("/")
                }
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    title: 'Error!',
                    text: `${error.message}`,
                    icon: 'error',
                    confirmButtonText: 'ok'
                })


            })

    }
    console.log(errors);
    return (
        <div>
            <h2 className='text-4xl font-semibold text-center mt-8 mb-4'>Please Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='w-2/3 mx-auto'>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Your Name</span>
                    </label>
                    <input type="text" placeholder="name" {...register("name", { required: true, maxLength: 100 })} className="input input-bordered border-cyan-500" />
                    {errors.name && <span className="text-red-600">Name field is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Photo URL</span>
                    </label>

                    <input type="text" placeholder="photoURL" {...register("photoURL", { required: true })} className="input input-bordered border-cyan-500" />
                    {errors.photoURL && <span className="text-red-600">Photo URL field is required</span>}

                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Your Email</span>
                    </label>

                    <input type="text" placeholder="email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} className="input input-bordered border-cyan-500" />
                    {errors.email && <span className="text-red-600">Email field is required</span>}
                    {errors.email?.type === 'pattern' && <span className="text-red-600">Please provide a valid email address.</span>}
                </div>
                {/* <div className="form-control">
                    <div className='flex pt-3'>
                        <input {...register("accountType", { required: true })} type="radio" value="student" className='' /> <span className='p-3'>I am a Student</span>
                        <input {...register("accountType", { required: true })} type="radio" value="instructor" /> <span className="p-3">I am an Instructor</span>
                        
                    </div>
                    {errors.accountType && <div className="text-red-600">Please select your interest to register</div>}

                </div> */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Password</span>
                    </label>

                    <div className="relative">
                        <input {...register("password", {
                            required: true,
                            minLength: 6,
                            maxLength: 20,
                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}/i
                        })} type={showPassword ? "text" : "password"} placeholder="password" className="input input-bordered border-cyan-500 w-full" />

                        <p className='absolute top-5 right-3' onClick={() => setShowPassword(!showPassword)}><small>
                            {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                        </small>
                        </p>
                    </div>


                    {errors.password?.type === 'required' && <span className="text-red-600">Password field is required</span>}
                    {errors.password?.type === 'minLength' && <span className="text-red-600">Password must be 6 character long.</span>}
                    {errors.password?.type === 'maxLength' && <span className="text-red-600">Password must be less than 20 character long.</span>}
                    {errors.password?.type === 'pattern' && <span className="text-red-600">Password must have one upper case one lower case one number and one special character.</span>}
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Confirm Password</span>
                    </label>

                    <div className="relative">
                        <input {...register("confirmPassword", { required: true })} name="confirmPassword" type={showConfPass ? "text" : "password"} placeholder="password" className="input input-bordered border-cyan-500 w-full" />
                        <p className='absolute top-5 right-3' onClick={() => setShowConfPass(!showConfPass)}><small>
                            {showConfPass ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                        </small>
                        </p>
                    </div>
                    {<span className='text-red-500'>{error}</span>}
                    {errors.confirmPassword && <span className="text-red-600">Confirmation field is required</span>}
                </div>




                <input type="submit" value="Register" className='btn btn-outline btn-info my-3' />

            </form>
            <SocialLogin></SocialLogin>
            <div className='px-6 pt-3 pb-10 text-center'>
                Already have an account? Please <Link to="/login"><span className='text-cyan-500'>login</span></Link> here.
            </div>

        </div>
    );
};

export default Register;