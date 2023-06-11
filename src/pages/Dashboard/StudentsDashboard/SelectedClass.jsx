import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const SelectedClass = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();

    const { data: selectedClasses = [] } = useQuery({
        queryKey: ['/bookings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/${user?.email}`)
            return res.data;
        }
    })


    return (
        <div className='w-full'>
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
                            <th>Seats</th>
                            <th>Price</th>
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
                                <td>{singleClass.classSeats}</td>
                                <td>${singleClass.classPrice}</td>
                                <th>
                                    <button className="btn btn-warning btn-xs">pay now</button>
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