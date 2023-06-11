import React from 'react';
import { FaHome, FaTools, FaUsers, FaWallet } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import useRole from '../hooks/useRole';

const Dashboard = () => {
    const [userRole] = useRole();
    // const [isAdmin] = useAdmin();
    // console.log("isadmin", isAdmin);

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

                    { userRole === 'admin' ? <>
                        <li><Link to="adminhome"><FaHome></FaHome> Admin Home</Link></li>
                        <li><Link to="users"><FaUsers></FaUsers> Manage Users</Link></li>
                        <li><Link to="classes"><FaTools></FaTools>Manage Classes</Link></li>
                    </>
                        : userRole === 'instructor' ? <>
                            <li><Link to="instructorshome"><FaHome></FaHome> Instructor Home</Link></li>
                            <li><Link to="addnewclass"><FaUsers></FaUsers> Add New Class</Link></li>
                            <li><Link to="myclasses"><FaTools></FaTools>My Classes</Link></li>
                        </>
                            : <>
                                <li><Link to="adminhome"><FaHome></FaHome> Student Home</Link></li>
                                <li><Link to="selectedclasses"><FaUsers></FaUsers> My Selected Classes</Link></li>
                                <li><Link to="enrolledclasses"><FaTools></FaTools>My Enrolled Classes</Link></li>
                                <li><Link to="paymenthistory"><FaWallet></FaWallet>Payment History</Link></li>
                            </>


                    }
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;