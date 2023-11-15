import React from 'react'

function ChessInfo2() {
    return(
        <div className='h-max w-full bg-black select-none'>
            <div className='flex flex-row justify-center items-center h-1/2 w-full'>
                
                <div className='flex flex-row items-center justify-start border-r-2 border-b-2 border-[#454545] h-full w-1/3 p-8'>
                    <div className='flex flex-col items-center justify-center w-1/2 h-full'>
                        <img onMouseDown={(e)=>e.preventDefault()} src='assets/piece_assets/king.png' alt='king' className='h-1/3 w-1/3'/>
                    </div>
                    <div className='flex flex-col items-start justify-start w-1/2 h-full'>
                        <h1 className='font-[Poppins] text-2xl text-[#dddddd] font-bold'>THE</h1>
                        <h1 className='font-[Poppins] text-[300%] mt-[-20px] text-[#dddddd] font-bold'>KING</h1>
                        <p className='font-[Poppins] text-sm text-[#dddddd] font-medium text-justify'>
                            In Chess the King is the most important piece. The object of the game is to trap the 
                            opponent's King so that its escape is not possible (Checkmate). 
                            The King can move one square in any direction (horizontally, vertically, or diagonally). 
                            The King also has a special move called castling that involves also moving a Rook.
                        </p>
                    </div>
                </div>

                <div className='flex flex-row items-center justify-start border-r-2 border-b-2 border-[#454545] h-full w-1/3 p-8'>
                    <div className='flex flex-col items-center justify-center w-1/2 h-full'>
                        <img onMouseDown={(e)=>e.preventDefault()} src='assets/piece_assets/queen.png' alt='queen' className='h-1/3 w-1/3'/>
                    </div>
                    <div className='flex flex-col items-start justify-start w-1/2 h-full'>
                        <h1 className='font-[Poppins] text-2xl text-[#dddddd] font-bold'>THE</h1>
                        <h1 className='font-[Poppins] text-[300%] mt-[-20px] text-[#dddddd] font-bold'>QUEEN</h1>
                        <p className='font-[Poppins] text-sm text-[#dddddd] font-medium text-justify'>
                            The Queen is the most powerful piece in the game of Chess. Its able to move any number of squares
                            in any direction (horizontally, vertically, or diagonally). The Queen is often used to attack the
                            opponent's King and to control the center of the board. The Queen is also used to protect other
                            pieces from being captured.
                        </p>
                    </div>
                </div>

                <div className='flex flex-row items-center justify-start border-b-2 border-[#454545] h-full w-1/3 p-8'>
                    <div className='flex flex-col items-center justify-center w-1/2 h-full'>
                        <img onMouseDown={(e)=>e.preventDefault()} src='assets/piece_assets/bishop.png' alt='bishop' className='h-1/3 w-1/3'/>
                    </div>
                    <div className='flex flex-col items-start justify-start w-1/2 h-full'>
                        <h1 className='font-[Poppins] text-2xl text-[#dddddd] font-bold'>THE</h1>
                        <h1 className='font-[Poppins] text-[300%] mt-[-20px] text-[#dddddd] font-bold'>BISHOP</h1>
                        <p className='font-[Poppins] text-sm text-[#dddddd] font-medium text-justify'>
                            The Bishop in chess glides diagonally across the board, a master tactician 
                            shaping the battlefield with its strategic influence. Its power lies in 
                            traversing long distances, controlling both dark and light squares. 
                            In the game's intricate tapestry, the bishop weaves a web of calculated moves, 
                            revealing the elegance of its positional prowess. 
                        </p>
                    </div>
                </div>

            </div>

            <div className='flex flex-row justify-center items-center h-1/2 w-full'>
                
                <div className='flex flex-row items-center justify-start border-r-2 border-[#454545] h-full w-1/3 p-8'>
                    <div className='flex flex-col items-center justify-center w-1/2 h-full'>
                        <img onMouseDown={(e)=>e.preventDefault()} src='assets/piece_assets/knight.png' alt='knight' className='h-1/3 w-1/3'/>
                    </div>
                    <div className='flex flex-col items-start justify-start w-1/2 h-full'>
                        <h1 className='font-[Poppins] text-2xl text-[#dddddd] font-bold'>THE</h1>
                        <h1 className='font-[Poppins] text-[300%] mt-[-20px] text-[#dddddd] font-bold'>KNIGHT</h1>
                        <p className='font-[Poppins] text-sm text-[#dddddd] font-medium text-justify'>
                            The Knight, a unique force in chess, leaps in an L-shaped pattern, 
                            defying conventional moves. Its ability to jump over pieces grants 
                            it unparalleled maneuverability, making it a strategic disruptor on 
                            the board. Knights excel in surprise attacks, embodying the art of 
                            tactical finesse in the intricate dance of the game.
                        </p>
                    </div>
                </div>

                <div className='flex flex-row items-center justify-start border-r-2 border-[#454545] h-full w-1/3 p-8'>
                    <div className='flex flex-col items-center justify-center w-1/2 h-full'>
                        <img onMouseDown={(e)=>e.preventDefault()} src='assets/piece_assets/rook.png' alt='rook' className='h-1/3 w-1/3'/>
                    </div>
                    <div className='flex flex-col items-start justify-start w-1/2 h-full'>
                        <h1 className='font-[Poppins] text-2xl text-[#dddddd] font-bold'>THE</h1>
                        <h1 className='font-[Poppins] text-[300%] mt-[-20px] text-[#dddddd] font-bold'>ROOK</h1>
                        <p className='font-[Poppins] text-sm text-[#dddddd] font-medium text-justify'>
                            The Rook, a stalwart presence in chess, dominates along ranks and files, 
                            carving paths with commanding strength. Its horizontal and vertical 
                            mobility grants it versatility, shaping the chess landscape. As the game 
                            unfolds, the rook emerges as a cornerstone of strategic might, fortifying 
                            positions and orchestrating the grandeur of controlled power.
                        </p>
                    </div>
                </div>

                <div className='flex flex-row items-center justify-start h-full w-1/3 p-8'>
                    <div className='flex flex-col items-center justify-center w-1/2 h-full'>
                        <img onMouseDown={(e)=>e.preventDefault()} src='assets/piece_assets/pawn.png' alt='pawn' className='h-1/3 w-1/3'/>
                    </div>
                    <div className='flex flex-col items-start justify-start w-1/2 h-full'>
                        <h1 className='font-[Poppins] text-2xl text-[#dddddd] font-bold'>THE</h1>
                        <h1 className='font-[Poppins] text-[300%] mt-[-20px] text-[#dddddd] font-bold'>PAWN</h1>
                        <p className='font-[Poppins] text-sm text-[#dddddd] font-medium text-justify'>
                            The Pawn, the humble foot soldier of chess, advances with measured steps, 
                            embodying potential and sacrifice. Its straightforward yet strategic 
                            movements anchor the front lines, holding the key to pawn structures 
                            and tactical openings.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ChessInfo2