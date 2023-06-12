import React from 'react';
import { FaFortAwesomeAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
            <section className='flex items-center h-screen p-16 bg-gray-100 text-gray-900'>
                <div className='container flex flex-col items-center justify-center px-5 mx-auto my-8'>
                    <FaFortAwesomeAlt className='w-40 h-40 text-cyan-500' />
                    <div className='max-w-md text-center'>
                        <h2 className='mb-8 font-extrabold text-9xl text-cyan-500'>
                            <span className='sr-only'>Error</span>

                        </h2>
                        <p className='text-2xl font-semibold md:text-3xl text-red-500 mb-8'>
                            Error 404: Page Not Found.
                        </p>
                        <Link to='/' className='btn bg-[#ec4c34] border-[#ec4c34] hover:bg-white hover:border-[#ec4c34] hover:text-[#ec4c34]'>
                            Back to homepage
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ErrorPage;