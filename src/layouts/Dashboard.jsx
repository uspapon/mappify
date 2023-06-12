import React, { useContext } from 'react';
import { FaHome, FaTools, FaUser, FaUserShield, FaUsers, FaWallet } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import useRole from '../hooks/useRole';
import { AuthContext } from '../provider/AuthProvider';

const Dashboard = () => {
    const [userRole] = useRole();
    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(() => { console.log("successfully logged out") })
            .catch(error => console.log(error));
    }

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">

                    {userRole === 'admin' ? <>
                        <li><Link to="/"><FaHome></FaHome> Home</Link></li>
                        <li><Link to="users"><FaUsers></FaUsers> Manage Users</Link></li>
                        <li><Link to="classes"><FaTools></FaTools>Manage Classes</Link></li>
                        <li><button onClick={handleLogout}><FaUserShield></FaUserShield>Logout</button></li>
                    </>
                        : userRole === 'instructor' ? <>
                            <li><Link to="/"><FaHome></FaHome> Home</Link></li>
                            <li><Link to="addnewclass"><FaUsers></FaUsers> Add New Class</Link></li>
                            <li><Link to="myclasses"><FaTools></FaTools>My Classes</Link></li>
                            {/* <li><button onClick={handleLogout}><FaUserShield></FaUserShield>Logout</button></li> */}
                        </>
                            : <>
                                <li><Link to="/"><FaHome></FaHome> Home</Link></li>
                                <li><Link to="selectedclasses"><FaUsers></FaUsers> My Selected Classes</Link></li>
                                <li><Link to="enrolledclasses"><FaTools></FaTools>My Enrolled Classes</Link></li>
                                <li><Link to="paymenthistory"><FaWallet></FaWallet>Payment History</Link></li>
                                <li><button onClick={handleLogout}><FaUser></FaUser>Logout</button></li>
                            </>


                    }
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;