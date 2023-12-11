import React, { useContext } from 'react'
import { ChessUtilsContext } from './Context/context';
import ChessAnimation from './Register/chessAnimation';
import { useNavigate } from 'react-router';
import { IoIosArrowRoundForward } from 'react-icons/io';

export default function NotFound() {

    const {chessUtils} = useContext(ChessUtilsContext);
    const navigate = useNavigate()

    return(
        <div className="h-full w-full bg-[#ffffff] flex items-center justify-center select-none ">
            <ChessAnimation/>    
            <div className={`flex flex-col items-center justify-center w-1/3 h-[45%] ${chessUtils?.bg} z-10`}>
                <div className={`flex flex-col items-center py-2 justify-start relative bg-white w-full h-full bottom-5 right-5 ${chessUtils?.border} border-4`}>
                    <h1 className={`font-[Monoton] ${chessUtils?.text} text-[320%]`}>8 X 8</h1>
                    <h1 className={`font-[Holtwood] ${chessUtils?.text} text-[404%]  mt-5`}>404</h1>
                    <h1 className={`font-[Holtwood] ${chessUtils?.text} text-[204%]  mt-5`}>You seem lost!!</h1>
                    <button onClick={()=>navigate('/')} className={`ring-1 ${chessUtils?.ring} text-xl  text-center px-10 py-1 mt-12 font-bold ${chessUtils?.text} hover:text-white ${chessUtils?.bgHover} ease-in-out duration-200 delay-75 flex flex-row items-center`}>Explore <IoIosArrowRoundForward size={40}/> </button>
                </div>
            </div>
            
        </div>
    )
}