import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/Shared/Navbar/Navbar';
import Footer from '../pages/Shared/Footer/Footer';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='max-w-7xl mx-auto'>
                <Outlet></Outlet>
            </div>
            <div className='bg-cyan-400'>
                <div className='max-w-7xl mx-auto'>
                    <Footer></Footer>
                </div>
            </div>
        </div>
    );
};

export default Main;