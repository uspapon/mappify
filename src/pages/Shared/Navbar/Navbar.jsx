import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../provider/AuthProvider';
import { Tooltip } from 'react-tooltip';
import useRole from '../../../hooks/useRole';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [userRole] = useRole();
    console.log("used role",userRole);
    const handleLogout = () => {
        logOut()
            .then(() => { console.log("successfully logged out") })
            .catch(error => console.log(error));
    }
    const navBarOptions = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="ourclass">Our Classes</Link></li>
        <li><Link to="ourinstructors">Our Instructor</Link></li>

        {
            userRole === 'admin' ? <li><Link to="dashboard/adminhome">Dashboard</Link></li>
                : userRole === 'instructor' ? <li><Link to="dashboard/instructorshome">Dashboard</Link></li>
                    : userRole === 'student' ? <li><Link to="dashboard/studentshome">Dashboard</Link></li>
                    : ""
        }
    </>
    return (
        <div className='bg-cyan-50'>
            <div className="navbar max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navBarOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-3xl font-bold">Mappify</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navBarOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a data-tooltip-id="my-tooltip" data-tooltip-content={user && user?.displayName}>
                        {user &&
                            <img
                                src={user && user?.photoURL}
                                alt="Profile"
                                className="h-10 w-10 rounded-full mr-4"
                            />}
                    </a>
                    {user ?
                        <>
                            <button onClick={handleLogout}>Logout</button>

                        </>
                        : <>
                            <Link to="login">Login</Link>
                            <span className='ms-3'><Link to="register">Register</Link></span>
                        </>
                    }
                    <Tooltip id="my-tooltip" />
                </div>
            </div>

        </div>
    );
};

export default Navbar;