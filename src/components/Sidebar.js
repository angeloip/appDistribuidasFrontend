import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
const Sidebar = () => {

    return (
        <div className='fixed w-[210px] bg-gray-800 h-full text-white absolute top-[82px] rounded-lg'>
            <NavLink to="/">
                <div className='flex items-center justify-center hover:text-rose-500'>
                    <div className='relative top-5 text-xl pr-2'>
                        <IoMdArrowRoundBack />
                    </div>
                    <h3 className='pt-10 text-xl  transition duration-150'>Back to home</h3>
                </div>
            </NavLink>

            <ul className='pt-10'>
                <NavLink to="/dashboard/main">
                    <li className='bg-gray-700 hover:bg-rose-500 transition duration-150 py-3 cursor-pointer px-14 rounded-md mt-0'>Dashboard</li>
                </NavLink>

            </ul>



        </div>
    );
};

export default Sidebar;