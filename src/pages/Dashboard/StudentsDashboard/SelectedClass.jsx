import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const SelectedClass = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();

    const { data: selectedClasses = [], refetch } = useQuery({
        queryKey: ['/bookings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/${user?.email}`)
            return res.data;
        }
    })

    const handleDelete = (id) => {
        axiosSecure.delete(`/bookings/${id}`)
            .then(res => {
                console.log("denied data", res.data);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire(
                        'Deleted!',
                        'Class has been deleted successfully.',
                        'success'
                    )
                }
            })


       

    }


    return (
        <div className='w-4/5'>
            <h2 className="text-3xl font-semibold text-center mt-8 mb-4">Classes I have Selected</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Class Image</th>
                            <th>Class Title</th>
                            <th>Instructor</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            selectedClasses.map((singleClass, index) => <tr key={singleClass._id}>
                                <th> {index + 1} </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask w-20 h-20">
                                                <img src={singleClass.classImage} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div className="font-bold">{singleClass.className}</div>

                                    </div>
                                </td>
                                <td>{singleClass.classInstructor}</td>
                                <td>${singleClass.classPrice}</td>
                                <th>
                                    <Link to="/dashboard/payment" state={{
                                        classInfo: {
                                            bookingEmail: singleClass.email,
                                            bookingId: singleClass._id,
                                            classId: singleClass.classId,
                                            className: singleClass.className,
                                            classPrice: singleClass.classPrice,

                                        }
                                    }}><button className="btn btn-warning btn-xs">pay now</button></Link>
                                    <button onClick={() => handleDelete(singleClass._id)} className="btn btn-sm btn-ghost text-white bg-red-600 mx-4"><FaTrashAlt></FaTrashAlt></button>
                                </th>
                            </tr>
                            )
                        }


                    </tbody>

                </table>
            </div>


        </div>
    );
};

export default SelectedClass;