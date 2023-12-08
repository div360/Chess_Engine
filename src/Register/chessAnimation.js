import React from 'react';


export default function ChessAnimation() {
    return (
        <div className='flex flex-col items-center justify-between h-full w-full  px-4 absolute z-0'>
            {
                Array(45).fill().map((_, i)=>(

                    <div className='flex flex-row items-center justify-between w-full h-max  px-4'>
                    {
                        Array(45).fill().map((_, index)=>(
                            <span className='h-[2px] w-[2px] rounded-full bg-black shadow-sm'></span>
                            ))
                    }
                    </div>
                    ))
            }

        </div>
    );
}