import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import { FaTrashAlt } from 'react-icons/fa';

const MyClasses = () => {
    const { user } = useAuth();
    const [toggle, setToggle] = useState(false);
    const [axiosSecure] = useAxiosSecure();
    const { data: classes = [], refetch } = useQuery(['/myclasses', user?.email], async () => {
        const res = await axiosSecure.get(`/instructor/myclasses/${user?.email}`);
        return res.data;


    })
    return (
        <div className='w-4/5'>
            <h2 className="text-3xl font-semibold text-center mt-8 mb-4">Manage Classes</h2>

            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Class Name</th>
                        <th>Available Seat</th>
                        <th>Total Students</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Feedback</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {   // TODO: calculate total number of students
                        classes.map((singleClass, index) => <tr key={singleClass._id}>
                            <th>{index + 1}</th>
                            <td>{singleClass.name}</td>
                            <td>{singleClass.seats}</td>
                            <td>{singleClass.seats}</td> 
                            <td>{singleClass.price}</td>
                            <td>{singleClass.status}</td>
                            <td>{singleClass?.feedback ? singleClass?.feedback : 'n/a'}</td>
                            <td>
                                {/* <button onClick={() => handleMakeAdmin(user)} className='btn btn-sm btn-warning mx-3'>Make Admin</button> */}
                                {/* onClick={() => setToggle(!toggle)} { toggle? "deny" : "avtivate"} */}
                                <button className='btn btn-sm btn-info me-3'>Edit</button>
                                
                            </td>
                        </tr>)
                    }

                </tbody>
            </table>


        </div>
    );
};

export default MyClasses;