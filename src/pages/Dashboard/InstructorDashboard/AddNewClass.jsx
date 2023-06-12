import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AddNewClass = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
        const { name, image, instructor, email, seats, price } = data;
        const newClass = { name, image, instructor: user?.displayName, email: user?.email, seats: parseInt(seats), totalSeats:parseInt(seats), price: parseFloat(price), status: "pending" }
        console.log("new Class", newClass);

        axiosSecure.post('/class', newClass)
            .then(data => {
                console.log("after posting new class", data.data)
                if (data.data.insertedId) {
                    // reset();
                    Swal.fire({
                        title: 'Success!',
                        text: `${name} class has been added`,
                        icon: 'success',
                        confirmButtonText: 'ok'
                    })

                }
            })
    }
    console.log(errors);
    return (
        <div className='w-2/3 mx-auto'>
            <h2 className="text-3xl font-semibold text-center mt-8 mb-4">Add New Class</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full mx-auto'>
                {/* <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Class Name</span>
                    </label>
                    
                </div> */}

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Class Name</span>
                    </label>
                    <input type="text" placeholder="Class Name" {...register("name", { required: true, maxLength: 150 })} className="input input-bordered border-cyan-500" />
                    {errors.name && <span className="text-red-600">Name field is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Class Image</span>
                    </label>
                    <input type="text" placeholder="Image URL" {...register("image", { required: true, maxLength: 150 })} className="input input-bordered border-cyan-500" />
                    {errors.image && <span className="text-red-600">Name field is required</span>}
                </div>
                <div className="flex justify-between w-2/3 my-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Instructor Name</span>
                        </label>
                        <p>{user.displayName}</p>

                        {/* <input type="text" defaultValue={user.displayName} disabled={true} placeholder="instructor" {...register("instructor", {})} className="input input-bordered border-cyan-500" /> */}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Email Address</span>
                        </label>
                        {user.email}
                        {/* <input type="text" defaultValue={user.email} disabled={true} placeholder="email" {...register("email", {})} className="input input-bordered border-cyan-500" /> */}

                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Available Seats</span>
                    </label>
                    <input type="number" placeholder="Available Seats" {...register("seats", { required: true })} className="input input-bordered border-cyan-500" />
                    {errors.seats && <span className="text-red-600">Name field is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Price</span>
                    </label>
                    <input type="text" placeholder="Price" {...register("price", { required: true })} className="input input-bordered border-cyan-500" />
                    {errors.price && <span className="text-red-600">Name field is required</span>}
                </div>
                <input type="submit" value="Add Class" className='btn btn-outline btn-info my-3' />






            </form>
        </div>
    );
};

export default AddNewClass;