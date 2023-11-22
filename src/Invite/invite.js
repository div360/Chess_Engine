import React, {useState, useEffect } from 'react'
import { toast, Toaster } from 'react-hot-toast';
import copy from 'copy-to-clipboard'
import { useNavigate } from 'react-router-dom';
import {AES} from 'crypto-js'

function Invite(){
    const [visibleInviteLink, setVisibleInviteLink] = useState("")
    const [inviteLink, setInviteLink] = useState("")
    const [selfLink, setSelfLink] = useState("")
    const navigate = useNavigate()


    const createInviteLink = (data) => {
        const hash = AES.encrypt(JSON.stringify(data), "8by8").toString()
        return hash;
    };

    useEffect(() => {
        const inviteData = {
            // "id": WordArray.random(16).toString(),
            "isCreator": false,
            "isWhite": false,
            "isBlackBoard": true
        };

        const selfData = {
            // "id": WordArray.random(16).toString(),
            "isCreator": true,
            "isWhite": true,
            "isBlackBoard": false
        };

        const inviteHash = createInviteLink(inviteData)
        const selfHash = createInviteLink(selfData)

        setInviteLink(`http://localhost:3000/playground/invite-id?${inviteHash}`)
        setVisibleInviteLink(`http://localhost:3000/playground/invite-id?${inviteHash.substring(0, inviteHash.length/2)}`)
        setSelfLink(`${selfHash}`)

    }, [])

    const handleCopyClick = ()=>{
        copy(inviteLink)
        toast.success("Invite Link copied successfully!")
    }

    const handlePlayClick = () => {
        navigate(`/playground/invite-id?${selfLink}`, { state: { isCreator: true, isWhite: true, isBlackBoard: false } })
    }

    return(
        <div className='h-full w-full bg-[#ffffff] flex items-center justify-center select-none'>
            <Toaster position="top-center" reverseOrder={false}/> 
            <div className='flex flex-col items-center justify-start min-h-[80%] container h-max'>
                <div className='flex flex-row items-center justify-center gap-3'>
                    <img onMouseDown={(e)=>e.preventDefault()} src='assets/bg_assets/logo.svg' alt='8by8 logo' className='h-10 w-10 my-12'/>
                    <h1 className='font-[Athiti] font-semibold text-3xl text-[#212121]'>
                        8x8
                    </h1>
                </div>
                <h1 className='font-[Athiti] font-semibold text-2xl text-[#212121]'>
                    Invite your friend for a dual
                </h1>
                <div className='flex flex-row mt-12 items-center justify-center h-48 w-2/3 bg-[#ffffff] shadow-lg rounded-lg gap-12 ring-1 ring-orange-400'>
                    <h1 className='font-[Poppins] font-medium text-sm text-[#212121] py-5 px-5 line-clamp-1 bg-slate-100 rounded-lg'>
                        {visibleInviteLink}
                    </h1>
                    <div onClick={handleCopyClick} className='hover:bg-[#2790f3] cursor-pointer font-[Poppins] font-medium text-md text-[#ffffff] py-3 px-6 rounded-lg shadow-sm bg-[#2689e6]'>Copy</div>
                </div>
                <div onClick={handlePlayClick} className='hover:bg-[#2790f3] mt-12 cursor-pointer font-[Poppins] font-medium text-md text-[#ffffff] py-3 px-6 w-1/5 text-center rounded-lg shadow-sm bg-[#2689e6]'>Let's Play</div>
            </div>
        </div>
    )
}

export default Invite;