import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';



// Todo: provide publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Getway_PK);
const Payment = () => {

    const location = useLocation();
    const { classInfo } = location.state;    
    const classPrice = classInfo.classPrice;
    

    return (
        <div className='w-full ms-10'>
            
            <h2 className='text-3xl px-10'>Money to Pay</h2>
            <Elements stripe={stripePromise}>
                <CheckoutForm price={classPrice} classInfo={classInfo}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;