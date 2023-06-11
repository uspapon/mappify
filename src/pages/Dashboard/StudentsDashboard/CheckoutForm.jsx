import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";



const CheckoutForm = ({ price, classInfo }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState();
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    useEffect(() => {
        if (price > 0) {
            // console.log("isPrice:", price)
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [price, axiosSecure])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('error', error);
            setCardError(error.message);
        } else {
            setCardError('');
            // console.log('Payment Method', paymentMethod);
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user.email || 'anonymous',
                        name: user.displayName || 'anonymous'
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError);
        }


        console.log("payment intent:", paymentIntent);
        setProcessing(false);

        if (paymentIntent.status === "succeeded") {
            setTransactionId(paymentIntent.id);
            // TODO: next steps
            const payment = {
                eamil: user?.email,
                transactionId: paymentIntent.id,
                price,
                bookingId: classInfo.bookingId,
                classId: classInfo.classId,
                className: classInfo.className,
                orderStatus: 'service pending',
                date: new Date(),

            }

            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        //  display confirm
                        Swal.fire({
                            title: 'Success!',
                            text: `Payment $ ${price} has been successful. Your Transaction ID is: ${transactionId}`,
                            icon: 'success',
                            confirmButtonText: 'ok'
                        })

                    }
                })
        }

    }

    return (
        <>
            <form className="w-2/3 m-8" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe || !clientSecret || processing} className="btn btn-primary btn-sm mt-4">
                    Pay
                </button>
            </form>
            {cardError && <p className="text-red-500 p-10">{cardError}</p>}
            {transactionId && <p className="text-green-500 p-10">Transaction complete with transaction ID {transactionId}</p>}
        </>
    );
};

export default CheckoutForm;

// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import React, { useEffect, useState } from 'react';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';

// const CheckoutForm = ({price}) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [axiosSecure] = useAxiosSecure();
//     const [processing, setProcessing] = useState(false);
//     const [cardError, setCardError] = useState('');
//     const [clientSecret, setClientSecret] = useState();

//     useEffect(() => {
//         console.log("price =",price);
//         if (price > 0) {
//             axiosSecure.post('/create-payment-intent', { price })
//                 .then(res => {
//                     console.log(res.data.clientSecret);
//                     setClientSecret(res.data.clientSecret)
//                 })
//         }
//     }, [price, axiosSecure])

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!stripe || !elements) {
//             return
//         }

//         const card = elements.getElement(CardElement);

//         if (card === null) {
//             return
//         }

//         const { error, paymentMethod } = await stripe.createPaymentMethod({
//             type: 'card',
//             card
//         })

//         if (error) {
//             console.log('error', error);
//             setCardError(error.message);
//         } else {
//             setCardError('');
//             // console.log('Payment Method', paymentMethod);
//         }

//         setProcessing(true);

//         const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
//             clientSecret,
//             {
//                 payment_method: {
//                     card: card,
//                     billing_details: {
//                         email: user.email || 'anonymous',
//                         name: user.displayName || 'anonymous'
//                     },
//                 },
//             },
//         );

//         if (confirmError) {
//             console.log(confirmError);
//         }


//         console.log("payment intent:", paymentIntent);
//         setProcessing(false);



//     }

//     return (
//         <>
//             <form onSubmit={handleSubmit}>
//                 <CardElement
//                     options={{
//                         style: {
//                             base: {
//                                 fontSize: '16px',
//                                 color: '#424770',
//                                 '::placeholder': {
//                                     color: '#aab7c4',
//                                 },
//                             },
//                             invalid: {
//                                 color: '#9e2146',
//                             },
//                         },
//                     }}
//                 />
//                 <button type="submit" className='btn btn-error btn-sm mt-4' disabled={!stripe || !clientSecret || processing}>
//                     Pay
//                 </button>
//             </form>
//             {cardError && <p className="text-red-500 p-10">{cardError}</p>}
//             {/* {transactionId && <p className="text-green-500 p-10">Transaction complete with transaction ID {transactionId}</p>} */}
//         </>
//     );
// };

// export default CheckoutForm;