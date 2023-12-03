import React from "react";
import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import socket from "../Socket/socket";
import { ChessContext } from "../Context/context";

function RegisterSecondUser () {

    const {message, setMessage} = useContext(ChessContext)
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
            socket.subscribe(`/topic/${params.roomId}`, (message1) => {
                console.log("Message from handleplay", message1.body);
                const parsedData = JSON.parse(message1.body);
                setMessage(parsedData)
            });
            navigate('/animation', {state: {roomId: params.roomId, playerId: params.playerId, color: color}})
        }
    }, [subscribe])

    const handleInputChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handlePlayButton = () => {
        fetch('http://localhost:8080/api/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
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
        <div className='h-full w-full bg-[#ffffff] flex items-center justify-center select-none'>
                <div className='flex flex-col items-center justify-start min-h-[80%] container h-max'>
                 <div className='flex flex-row items-center justify-center gap-3'>
                     <img src="assets/bg_assets/logo.svg" alt="" />
                     <h1 className='font-[Athiti] font-semibold text-3xl text-[#212121]'>
                         Form
                     </h1>
                 </div>
                 <h1 className='font-[Athiti] font-semibold text-2xl text-[#212121]'>
                     Enter your details
                 </h1>
                 <div className='flex flex-col mt-12 items-center justify-center h-48 w-2/3 bg-[#ffffff] shadow-lg rounded-lg gap-12 ring-1 ring-orange-400'>
                     <input type='text' name='name' placeholder='Enter your name' className='font-[Poppins] font-medium text-sm text-[#212121] py-5 px-5 line-clamp-1 bg-slate-100 rounded-lg' onChange={handleInputChange}/>
                 </div>
                 <div className='hover:bg-[#2790f3] mt-12 cursor-pointer font-[Poppins] font-medium text-md text-[#ffffff] py-3 px-6 w-1/5 text-center rounded-lg shadow-sm bg-[#2689e6]' onClick={handlePlayButton}  >Let's Play</div>
             </div>
        </div>
    )
}
export default RegisterSecondUser;