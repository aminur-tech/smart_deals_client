import React from 'react';
import Navbar from '../Component/Navbar';
import { Outlet } from 'react-router';

const HomeLayout = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default HomeLayout;