import React, {useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast';
import copy from 'copy-to-clipboard'
import { useNavigate } from 'react-router-dom';
import ChessAnimation from '../Register/chessAnimation';
import { IoIosArrowRoundForward  } from "react-icons/io";
import { ChessUtilsContext } from '../Context/context';

function Invite(){
    const {chessUtils} = useContext(ChessUtilsContext);
    const [visibleInviteLink, setVisibleInviteLink] = useState("")
    const [inviteLinkShort, setInviteLinkShort] = useState("")
    const navigate = useNavigate();

    const location = useLocation();
    const roomId = location?.state?.roomId === undefined ? "" : location?.state?.roomId;
    const player1Id = location?.state?.player1Id === undefined ? "" : location?.state?.player1Id;
    const player2Id = location?.state?.player2Id === undefined ? "" : location?.state?.player2Id;
    const player1Color = location?.state?.player1Color === undefined ? "" : location?.state?.player1Color;

    useEffect(() => {
        const link = `${process.env.REACT_APP_FRONTEND_URL}/join/${roomId}/${player2Id}`
        setVisibleInviteLink(link)
        setInviteLinkShort(link.trim().substring(0, 37) + "...")
    }, [])

    const handleCopyClick = ()=>{
        copy(visibleInviteLink)
        copy(visibleInviteLink)
        toast.success("Invite Link copied successfully!")
    }

    const handlePlay = () => {
        console.log("Player Id from Invite: ", player1Id);
        navigate('/lobby', {state: {roomId: roomId, playerId: player1Id, color: player1Color}})
    }

    return(

        <div className="h-full w-full bg-[#ffffff] flex items-center justify-center select-none">
            <Toaster position="top-center" reverseOrder={false}/> 
            <ChessAnimation/>
            <div className={`flex flex-col items-center justify-center w-5/12 h-2/5 ${chessUtils?.bg} z-10`}>
                <div className={`flex flex-col items-center py-2 justify-start relative bg-white w-full h-full bottom-5 right-5 ${chessUtils?.border} border-4`}>
                    <h1 className={`font-[Monoton] ${chessUtils?.text} text-[320%]`}>8 X 8</h1>
                    <h1 className={`font-century-gothic ${chessUtils?.text} text-xl font-bold mt-5`}>Click on Generate to create a new chess room</h1>
                    <div className='flex flex-row items-center justify-center w-[90%] h-max mt-10'>
                        <div className={`font-[Poppins] font-medium text-lg ring-1 ${chessUtils.ring} ${chessUtils.text} py-3 px-5 w-[80%] bg-slate-200 outline-none`}>{inviteLinkShort}</div>
                        <div onClick={handleCopyClick} className={`${chessUtils.bg} text-white font-[Poppins] text-lg py-3 px-10 text-center w-[20%] ring-1 ${chessUtils.ring} cursor-pointer hover:scale-105 ease-in-out duration-200 delay-75`}>Copy</div>
                    </div>
            
                    <button onClick={handlePlay} className={`ring-1 ${chessUtils?.ring} text-xl text-center px-10 py-1 mt-12 font-bold ${chessUtils?.text} hover:text-white ${chessUtils?.bgHover} ease-in-out duration-200 delay-75 flex flex-row items-center`}>Let's Play <IoIosArrowRoundForward  size={40}/> </button>
                </div>
            </div>
        </div>
    )
}

export default Invite;