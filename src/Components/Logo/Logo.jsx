import React from 'react';

import logo from '../../assets/logo.png'
const Logo = () => {
    return (
        <div className='flex items-center'>
            <img src={logo} alt="" />
            <h3 className='text-3xl font-bold -ms-3 mt-2  '>zapShift</h3>
        </div>
    );
};

export default Logo;