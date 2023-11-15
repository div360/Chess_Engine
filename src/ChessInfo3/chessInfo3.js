import React from 'react'

function ChessInfo3() {
    return(
        <div className='min-h-[60%] h-max w-full bg-[#faeef8] flex flex-col items-center justify-center select-none pb-12'>
            
            <div className='flex flex-col items-center justify-start h-[10%] w-full top-[10%] relative pt-16'>
                <span className='gradient-line-left2'></span>
                <h1 className='text-[#212121] font-[Poppins] font-semibold text-lg'>CHECK THE</h1>
                <h1 className='text-[#212121] font-[Poppins] font-semibold text-[350%] mt-[-20px]'>BOARD</h1>
                <span className='gradient-line-right2'></span>
            </div>

            <div className='flex flex-row justify-center items-center h-full w-10/12 gap-6'>
                <div className='flex flex-col items-center justify-start h-full w-1/2 pt-12'>
                    <p className='font-[Athiti] font-bold text-justify text-lg text-[#212121]'>
                        Chess, the ancient game of kings, unfolds on a checkered 
                        battlefield, the chessboard, where black and white squares 
                        bear witness to the timeless struggle of intellect. The 64 
                        squares become a canvas for strategic warfare, each piece a 
                        unique character in the unfolding drama. The board, a microcosm 
                        of strategy, is divided into ranks and files, providing a 
                        geometric stage for the intricacies of maneuvering and confrontation. 
                        As players contemplate their moves, the chessboard transforms into a 
                        tapestry of foresight and consequence. The silent squares hold the 
                        echoes of countless battles, each piece a sentinel in the grand 
                        symphony of wits, where victory is a harmonious blend of calculation,
                        creativity, and control.
                    </p>
                </div>

                <div className='flex flex-col items-center justify-start h-full w-1/2'>
                    <img onMouseDown={(e)=>e.preventDefault()} src='assets/bg_assets/chess_board_4.jpg' alt='chessboard' className='h-[80%] w-[80%] object-contain'/>
                </div>
            </div>
        </div>
    )
}

export default ChessInfo3