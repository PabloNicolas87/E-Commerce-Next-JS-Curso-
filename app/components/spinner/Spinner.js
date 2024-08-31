import React from 'react';
import './Spinner.css'

const SimpleSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin-slow w-16 h-16 border-t-4 border-blue-500 rounded-full"></div>
    </div>
  );
};

export default SimpleSpinner;