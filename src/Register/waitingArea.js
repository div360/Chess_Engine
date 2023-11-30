import React from 'react';
import 'tailwindcss/tailwind.css';

export default function WaitingArea(){
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="space-y-3">
        <p className="text-white text-2xl">Loading...</p>
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      </div>
    </div>
  );
};
