import React from 'react'
import './chessInfo1.css'

function ChessInfo1() {
    return (
        <div className='min-h-[70%] h-max bg-[#faeef8] w-full flex flex-col items-center justify-start select-none'>
            <div className='flex flex-col items-center justify-start h-[10%] w-full top-[10%] relative pt-16'>
                <span className='gradient-line-left2'></span>
                <h1 className='text-[#212121] font-[Poppins] font-semibold text-lg'>CHECK THE</h1>
                <h1 className='text-[#212121] font-[Poppins] font-semibold text-[350%] mt-[-20px]'>FIGURES</h1>
                <span className='gradient-line-right2'></span>
            </div>

            <div className='flex flex-col items-center justify-start h-[30%] w-full pt-4'>
                <p className='font-[Athiti] font-bold text-lg text-[#212121] h-full w-10/12 text-center'>
                Chess is a timeless game played on a battlefield of 64 squares, 
                each piece a unique character with distinct abilities. The pawns, 
                foot soldiers, advance cautiously; knights, the elegant cavalry, 
                maneuver in L-shaped leaps. Bishops, the diagonal tacticians, 
                control the board with finesse, while rooks, the mighty chariots, 
                command open ranks. The queen, a formidable force, combines the 
                powers of rook and bishop. The king, though vital, moves with 
                caution, surrounded by an entourage of strategy. In this intricate
                dance of pieces, every move narrates a story of conquest and cunning.
                </p>
            </div>

            <div className='flex flex-col items-center justify-start pt-16 h-full w-2/3'>
                <img onMouseDown={(e)=>e.preventDefault()} src='assets/bg_assets/chessline.png' alt='chess pieces' className='h-[100%] w-[60%] object-contain'/>
            </div>

        </div>
    )
}

export default ChessInfo1