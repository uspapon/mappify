import React from 'react';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <h2 className="text-3xl">Dashboard</h2>
            <Outlet></Outlet>
        </div>
    );
};

export default Dashboard;