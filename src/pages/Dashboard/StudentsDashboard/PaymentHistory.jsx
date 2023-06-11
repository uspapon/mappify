import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();

    const { data: payments = [] } = useQuery({
        queryKey: ['/payment-history', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment-history/${user?.email}`)
            return res.data;
        }
    })
    return (
        <div>
            <h2 className="text-3xl font-semibold text-center mt-8 mb-4">My Payment History</h2>
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Transaction ID</th>
                        <th>Paid For</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        payments.map((payment, index) => <tr key={payment._id}>
                            <th> {index + 1} </th>
                           
                            <td>
                                <div>
                                    <div className="font-bold">{payment.transactionId}</div>

                                </div>
                            </td>
                            <td>{payment.className}</td>
                            <td>${payment.price}</td>
                            <th>
                                {payment.date}
                            </th>
                        </tr>
                        )
                    }


                </tbody>

            </table>
        </div>
    );
};

export default PaymentHistory;