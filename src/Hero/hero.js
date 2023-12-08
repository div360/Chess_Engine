import React from "react";
import { useNavigate } from "react-router-dom";
import '../fonts/font.css'

function Hero(){
    const navigate = useNavigate();
    const background = "assets/bg_assets/wooden-background.jpg";
    const buttonBackground = "assets/bg_assets/button.png";
    const handleClickPlayground = () => {
        navigate('/playground');
    }

    const handleClickFriend = () => {
        navigate('/register');
    }

    return(
        <div className="h-[60%] w-full bg-cover bg-center bg-no-repeat select-none" style={{backgroundImage: `url(${background})`}}>
           <div className="flex flex-row items-center justify-center h-full container mx-auto ">
                
                <div className="flex flex-col h-1/2 w-1/2 items-center justify-center gap-6">
                    <div className="flex flex-col justify-center items-center">
                        <div id="title" className="mt-10 mb-0 italic text-[#d6d2b9] text-[10vh]">8 X 8</div>
                        <div id="title" className="-mt-8 italic text-[#d6d2b9] text-[15vh]">Chess</div>
                    </div>
                    
                    <h1 className="font-[Athiti] text-[#fefafd] font-medium text-md text-center w-2/3 pb-6">8X8 is your one stop solution for AI based Chess engine with loaded features like video calls, timers, move history and much more ...</h1>
                    <div className="flex flex-row items-center justify-center h-12 gap-6">
                        <button onClick={handleClickPlayground} className="hover:ring-1 ring-white bg-[#d7a830] text-[black] font-[Athiti] font-semibold text-lg px-4 py-2 rounded-md">Play with Computer</button>
                        <button onClick={handleClickFriend} className="hover:ring-1 text-[#000000] font-[Athiti] font-semibold text-lg px-4 py-2 rounded-md" style={{backgroundImage: `url(${buttonBackground})`}}>Play with a Friend</button>
                    </div>
                </div>

                <div className="flex flex-col items-center w-1/2 justify-center">
                    <img onMouseDown={(e)=>e.preventDefault()} src="assets/bg_assets/imagealt.jpg" alt="Knight Background" className="rounded-2xl mr-24 object-contain self-end h-[80vh] w-[23vw]" style={{borderRadius:'24px'}}/>
                </div>
           </div>
        </div>
    )
}


export default Hero;