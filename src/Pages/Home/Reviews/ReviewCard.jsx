import React from 'react';
import { FaQuoteLeft, FaUserCircle } from 'react-icons/fa';

const ReviewCard = ({review}) => {
     
    const { userName , review:testimonial , user_photoURL} = review
    
    return (
         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
        {/* Card header with number */}
        <div className="flex justify-between items-center p-6 pb-4">
          <h2 className="text-4xl font-bold text-gray-800">
           <FaQuoteLeft></FaQuoteLeft>
          </h2>
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
        </div>
        
        {/* Card content */}
        <div className="card-body pt-0 px-6 pb-6">
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
           {testimonial}
          </p>
          
          {/* Checkbox with user info */}
          <div className="flex items-start space-x-3 mt-4">
            <div className="checkbox-wrapper mt-1">
              <input 
                type="checkbox" 
                id="user-checkbox" 
                className="checkbox checkbox-primary h-5 w-5 rounded border-gray-300" 
              />
            </div>
            <div className="flex items-center space-x-2">
              <img className='rounded-full w-14 h-14' src={user_photoURL} alt="" />
              <div>
                <p className="font-medium text-gray-900">{userName}</p>
                <p className="text-sm text-gray-500">Senior Product Designer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default ReviewCard;