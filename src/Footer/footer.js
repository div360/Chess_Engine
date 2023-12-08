import React from 'react'
import './footer.css'

const Footer = () => {
    return(
        <div className='bg-black w-full min-h-[30%] h-max mx-auto flex flex-col items-center justify-start relative select-none'>
            <div className='font-[Poppins] font-semibold text-[#dddddd]'>
                <span className="gradient-line-left3"></span>
                <span className="gradient-line-vertical-left2"></span>
                <span className="relative">
                    <div className='flex flex-col items-center justify-center relative'>
                        <span className="z-10 relative text-[150%] mt-7">Disclaimer</span>
                    </div>
                </span>
                <span className="gradient-line-right3"></span>
                <span className="gradient-line-vertical-right2"></span>
            </div>
            <span className='font-[Poppins] text-[#dddddd] font-medium text-md  z-10 text-center mt-12'>
                This is a personal project and is not affiliated with any organization.
                Any assets used in the project are for educational purposes only.
                <br/>
                The project is open source and can be found on <a className='text-[#ed673b]' href='https://github.com/hrishabh17/Chess_Engine'>GitHub</a>
            </span>
        </div>
    )
}

export default Footer