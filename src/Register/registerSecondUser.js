import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import socket from "../Socket/socket";

function RegisterSecondUser () {

    const navigate = useNavigate();
    const params = useParams();
    const [subscribe, setSubscribe] = useState(false)
    const [color, setColor] = useState('')

    const [user, setUser] = useState({
        roomId: params.roomId,
        name: '',
        playerId: params.playerId,
    })
    
    useEffect(() => {
        socket.connect();
      }, [])

    useEffect(() => {
        if(subscribe) {
            navigate('/lobby', {state: {roomId: params.roomId, playerId: params.playerId, color: color}})
        }
    }, [subscribe])

    const handleInputChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handlePlayButton = () => {
        if(user.name.trim().length === 0) return;
        
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            if(data.message==="Joined room successfully")
            {
                setColor(data.player2Color)
                setSubscribe(true);
            }else{
                alert("Cannot Join")
            }
        })
    }

    return(
        // <div className='h-full w-full bg-[#ffffff] flex items-center justify-center select-none'>
        //         <div className='flex flex-col items-center justify-start min-h-[80%] container h-max'>
        //          <div className='flex flex-row items-center justify-center gap-3'>
        //              <img src="assets/bg_assets/logo.svg" alt="" />
        //              <h1 className='font-[Athiti] font-semibold text-3xl text-[#212121]'>
        //                  Form
        //              </h1>
        //          </div>
        //          <h1 className='font-[Athiti] font-semibold text-2xl text-[#212121]'>
        //              Enter your details
        //          </h1>
        //          <div className='flex flex-col mt-12 items-center justify-center h-48 w-2/3 bg-[#ffffff] shadow-lg rounded-lg gap-12 ring-1 ring-orange-400'>
        //              <input type='text' name='name' placeholder='Enter your name' className='font-[Poppins] font-medium text-sm text-[#212121] py-5 px-5 line-clamp-1 bg-slate-100 rounded-lg' onChange={handleInputChange}/>
        //          </div>
        //          <div className='hover:bg-[#2790f3] mt-12 cursor-pointer font-[Poppins] font-medium text-md text-[#ffffff] py-3 px-6 w-1/5 text-center rounded-lg shadow-sm bg-[#2689e6]' onClick={handlePlayButton}  >Let's Play</div>
        //      </div>
        // </div>

        <div className="h-full w-full bg-[#ffffff] flex items-center justify-center select-none">
            <div className='flex flex-col items-center justify-center w-1/3 h-2/5 bg-black'>
                <div className='flex flex-col items-center py-2 justify-start relative bg-white w-full h-full bottom-5 right-5 border-black border-2'>
                    <h1 className='font-[Monoton] text-black text-[320%]'>8 X 8</h1>
                    <h1 className='font-[Athiti] text-black text-xl font-bold mt-5'>Click on Join to enter the chess room</h1>
                    <div className='flex flex-row items-center justify-center w-4/5 h-max mt-10'>
                        <h1 className='bg-black text-white font-[Poppins] text-lg py-3 px-10 text-center w-1/3 ring-1 ring-black'>Name</h1>
                        <input type='text' name='name' placeholder='Enter your name' className='font-[Poppins] font-medium text-lg ring-1 ring-black text-[#212121] py-3 px-5 w-2/3 line-clamp-1 bg-slate-200 outline-none' onChange={handleInputChange}/>
                    </div>
                   
                    <button onClick={handlePlayButton} className='ring-1 ring-black text-xl text-center px-10 py-1 mt-12 font-[Athiti] hover:text-white hover:bg-black ease-in-out duration-200 delay-75'>Join</button>
                </div>
            </div>
        </div>
    )
}
export default RegisterSecondUser;