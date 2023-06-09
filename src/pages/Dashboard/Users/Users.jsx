import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaTrashAlt, FaUserCog, FaUserGraduate, FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const Users = () => {
    const { loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: users = [], refetch } = useQuery(['/users'], async () => {
        const res = await axiosSecure('/users');
        return res.data;


    })
    
    // const { data: users = [], refetch } = useQuery(['/users'], async () => {
    //     const res = await fetch('http://localhost:5000/users');
    //     return res.json();


    // })

    const handleDelete = (user) => {
        fetch(`http://localhost:5000/users/${user._id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            refetch();
            if(data.deletedCount > 0){
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} is deleted from the system.`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }

        })

    }

    const handleMakeAdmin = (user) => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH'

        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} is an admin now.`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })

    }

    const handleMakeInstructor = (user) => {
        fetch(`http://localhost:5000/users/instructor/${user._id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} is an instructor now.`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })

    }


    return (
        <div className='w-3/4'>
            <h2 className="text-3xl my-4">Total Users {users.length}</h2>
            <div className="overflow-x-auto w-full">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role === 'admin' ? <FaUserShield></FaUserShield> : user.role === 'instructor' ? <FaUserCog></FaUserCog> : <FaUserGraduate></FaUserGraduate> }</td>
                                <td>
                                    <button onClick={() => handleMakeAdmin(user)}className='btn btn-sm btn-warning mx-3'>Make Admin</button>
                                    <button onClick={() => handleMakeInstructor(user)} className='btn btn-sm btn-info me-3'>Make Instructor</button>
                                    <button onClick={() => handleDelete(user)} className="btn btn-sm btn-ghost text-white bg-red-600"><FaTrashAlt></FaTrashAlt></button>
                                </td>
                            </tr>)
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;