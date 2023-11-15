import React from 'react';
import './header.css';

function Header() {
    return (
        <div className='bg-black w-full h-[10%] top-[3%] mx-auto flex flex-col items-center justify-center relative select-none'>
            <div className='font-[Poppins] font-semibold text-[#dddddd]'>
                <span className="gradient-line-left"></span>
                <span className="gradient-line-vertical-left"></span>
                <span className="relative">
                    <div className='flex flex-col items-center justify-center relative'>
                        <span className="z-10 relative text-[450%]">8X8</span>
                        <h1 className='relative font-light'>The Noob's Chess Engine</h1>
                    </div>

                </span>
                <span className="gradient-line-right"></span>
                <span className="gradient-line-vertical-right"></span>
            </div>
        </div>
    );
}

export default Header;
