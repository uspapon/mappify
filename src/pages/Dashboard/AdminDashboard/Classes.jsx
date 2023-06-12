import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';


const Classes = () => {
    const { user } = useAuth();
    const [toggle, setToggle] = useState(false);
    const [axiosSecure] = useAxiosSecure();
    const [feedback, setFeedback] = useState('');
    const { data: allClasses = [], refetch } = useQuery(['/allclasses'], async () => {
        const res = await axiosSecure.get(`/admin/allclasses/`);
        return res.data;


    })


    const handleApprove = (singleClass) => {
        axiosSecure.patch(`/admin/class/approve/${singleClass._id}`)
            .then(res => {
                console.log("approved data", res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire(
                        'Approved!',
                        'Class has been approved.',
                        'success'
                    )
                }
            })
    }
    const handleDeny = (singleClass) => {
        axiosSecure.patch(`/admin/class/deny/${singleClass._id}`)
            .then(res => {
                console.log("denied data", res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire(
                        'Denied!',
                        'Class has been denied.',
                        'success'
                    )
                }
            })

    }


    const handleFeedback = (singleClass) => {
        axiosSecure.patch(`/admin/class/feedback/${singleClass._id}`, {feedback})
        .then(res => {
            console.log("feedback message", res.data);
            if (res.data.modifiedCount > 0) {
                Swal.fire(
                    'Message Sent!',
                    `${singleClass.name} has been given feedbac`,
                    'success'
                )
            }
        })


        console.log("feedback class id: ", singleClass)

    }

    return (
        <div className='w-full ms-10'>
            <h2 className="text-3xl font-semibold text-center mt-8 mb-4">Manage Classes</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    #
                                </label>
                            </th>
                            <th>Class Image</th>
                            <th>Class Title</th>
                            <th>Available Seats</th>
                            <th>Total Enrolled</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allClasses?.map((singleClass, index) => <tr key={singleClass._id}>
                                <th>
                                    <label> {index + 1} </label>
                                </th>
                                <td>
                                    <div className="mask w-24 h-24">
                                        <img src={singleClass.image} alt="Class Image" />
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div className="font-bold">{singleClass.name}</div>
                                    </div>
                                </td>
                                <td>{singleClass.seats}</td>
                                <td>{singleClass.seats}</td>
                                <td>{singleClass.price}</td>
                                <td>{singleClass.status}</td>
                                <th>
                                    <button onClick={() => handleApprove(singleClass)} className='btn btn-sm btn-warning mx-3'>Approve</button>
                                    <button onClick={() => handleDeny(singleClass)} className='btn btn-sm btn-error me-3'>Deny</button>

                                    {/* Open the modal using ID.showModal() method */}
                                    {/* The button to open modal */}
                                    <label  htmlFor={`my_modal_${index}`} className="btn btn-sm btn-accent me-3">send feedback</label>

                                    {/* Put this part before </body> tag */}
                                    <input type="checkbox" id={`my_modal_${index}`} className="modal-toggle" />
                                    <div className="modal">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg my-4">Denial Note</h3>
                                            {/* <form onSubmit={handleFeedback}> */}
                                                <div className="form-control">
                                                    <label className="input-group input-group-vertical">
                                                        <span className='p-4'>Feedback</span>
                                                        <textarea onChange={(e) => setFeedback(e.target.value)} id='message' name='message' required className="textarea textarea-bordered h-32" placeholder="Message for denial"></textarea>               
                                                        
                                                    </label>
                                                </div>
                                                <div className="modal-action">
                                                    <label htmlFor={`my_modal_${index}`} className="btn btn-sm btn-error">Close!</label>                                                   
                                                    <button onClick={() => handleFeedback(singleClass)}  className="btn btn-sm btn-warning">Send</button>
                                                </div>
                                            {/* </form> */}

                                        </div>
                                    </div>
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

export default Classes;