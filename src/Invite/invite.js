import React, {useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast';
import copy from 'copy-to-clipboard'
import { useNavigate } from 'react-router-dom';
import socket from '../Socket/socket';
import {ChessContext} from '../Context/context';

function Invite(){
    const {message, setMessage} = useContext(ChessContext)
    const [visibleInviteLink, setVisibleInviteLink] = useState("")
    const navigate = useNavigate();

    const location = useLocation();
    const roomId = location?.state?.roomId === undefined ? "" : location?.state?.roomId;
    const player1Id = location?.state?.player1Id === undefined ? "" : location?.state?.player1Id;
    const player2Id = location?.state?.player2Id === undefined ? "" : location?.state?.player2Id;
    const player1Color = location?.state?.player1Color === undefined ? "" : location?.state?.player1Color;

    useEffect(() => {
        setVisibleInviteLink(`http://localhost:3000/join/${roomId}/${player2Id}`)
    }, [])

    const handleCopyClick = ()=>{
        copy(visibleInviteLink)
        toast.success("Invite Link copied successfully!")
    }

    const handlePlay = () => {
        navigate('/lobby', {state: {roomId: roomId, playerId: player1Id, color: player1Color}})
    }

    return(
        <div className='h-full w-full bg-black flex items-center justify-center select-none'>
            <Toaster position="top-center" reverseOrder={false}/> 
            <div className='flex flex-col items-center justify-start min-h-[80%] container h-max'>
                <div className='flex flex-row items-center justify-center gap-3'>
                    <img onMouseDown={(e)=>e.preventDefault()} src='assets/bg_assets/logo.svg' alt='8by8 logo' className='h-10 w-10 my-12'/>
                    <h1 className='font-[Athiti] font-semibold text-3xl text-[#ffffff]'>
                        8x8
                    </h1>       
                </div>
                <h1 className='font-[Athiti] font-semibold text-2xl text-[#ffffff]'>
                    Invite your friend for a dual
                </h1>
                <div className='px-4 flex flex-row mt-12 items-center justify-center h-48 w-2/3 bg-[] shadow-lg rounded-lg gap-12 ring-1 ring-orange-400'>
                    <h1 className='font-[Poppins] font-medium text-sm text-[#ffffff] py-5 px-5 line-clamp-1 border border-orange-400 rounded-lg'>
                        {visibleInviteLink}
                    </h1>
                    <div onClick={handleCopyClick} className='hover:bg-[#2790f3] cursor-pointer font-[Poppins] font-medium text-md text-[#ffffff] py-3 px-6 rounded-lg shadow-sm bg-[#2689e6]'>Copy</div>
                </div>
                <div className='hover:bg-[#2790f3] mt-12 cursor-pointer font-[Poppins] font-medium text-md text-[#ffffff] py-3 px-6 w-1/5 text-center rounded-lg shadow-sm bg-[#2689e6]' onClick={handlePlay}>Let's Play</div>
            </div>
        </div>
    )
}

export default Invite;