import React from "react";
import { useNavigate } from "react-router-dom";

function Hero(){
    const navigate = useNavigate();

    const handleClickPlayground = () => {
        navigate('/playground');
    }

    const handleClickFriend = () => {
        navigate('/invite');
    }

    return(
        <div className="h-[60%] w-full bg-[#000000] select-none">
           <div className="flex flex-row items-center justify-center h-full container mx-auto ">
                
                <div className="flex flex-col h-1/2 w-1/2 items-center justify-center gap-6">
                    <h1 className="font-[Poppins] text-[#fefafd] font-bold text-4xl">CHESS BRINGS GREAT IDEAS TO LIFE</h1>
                    <h1 className="font-[Athiti] text-[#fefafd] font-medium text-md text-center w-2/3 pb-6">8X8 is your one stop solution for AI based Chess engine with loaded features like video calls, timers, move history and much more ...</h1>
                    <div className="flex flex-row items-center justify-center h-12 gap-6">
                        <button onClick={handleClickPlayground} className="hover:ring-1 ring-white bg-[#ed673b] text-[#ebebeb] font-[Athiti] font-semibold text-lg px-4 py-2 rounded-md">Play with Computer</button>
                        <button onClick={handleClickFriend} className="hover:ring-1 ring-[#ed673b] bg-[#fefafd] text-[#000000] font-[Athiti] font-semibold text-lg px-4 py-2 rounded-md">Play with a Friend</button>
                    </div>
                </div>

                <div className="flex flex-col items-center w-1/2 justify-center">
                    <img onMouseDown={(e)=>e.preventDefault()} src="assets/bg_assets/knight_7.jpg" alt="Knight Background" className="object-contain self-end h-4/5 w-2/5"/>
                </div>
           </div>
        </div>
    )
}


export default Hero;