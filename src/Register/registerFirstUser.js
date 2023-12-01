import React, { useState } from 'react';
import {Stomp, over} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { toast, Toaster } from 'react-hot-toast';
import copy from 'copy-to-clipboard'
import { useNavigate } from 'react-router-dom';


export default function RegisterFirstUser() {

    let stompClient = null;
    const navigate = useNavigate()

    const[formSubmitted, setFormSubmitted] = useState(false);

    const [user, setUser] = useState({
        id: 'randomId',
        name: '',
        color: '',
    })

    const [roomPlayerData, setRoomPlayerData] = useState();

    const handleInputChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const registerUser=()=>{
            fetch('http://localhost:8080/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(response => response.json())
            .then(data => {
                setRoomPlayerData(data);
                setFormSubmitted(true);
                navigate(`/invite`, { state: { roomId: data.roomId, player1Id: data.player1Id, player2Id: data.player2Id } })
            });
    }

    // const onConnected = () => {
    //     stompClient.subscribe(`/user/${user.id}/queue/messages`, onMessageReceived);
    //     stompClient.subscribe(`/user/public`, onMessageReceived);
    // }

    // async function onMessageReceived(payload) {
    // console.log('Message received', payload);
    // }

    // const onError = (err) => {console.log(err)}

    return(
        <div className='h-full w-full bg-[#ffffff] flex items-center justify-center select-none'>
                <div className='flex flex-col items-center justify-start min-h-[80%] container h-max'>
                 <div className='flex flex-row items-center justify-center gap-3'>
                     <img onMouseDown={(e)=>e.preventDefault()} src='assets/bg_assets/logo.svg' alt='logo' className='h-10 w-10 my-12'/>
                     <h1 className='font-[Athiti] font-semibold text-3xl text-[#212121]'>
                         Form
                     </h1>
                 </div>
                 <h1 className='font-[Athiti] font-semibold text-2xl text-[#212121]'>
                     Enter your details
                 </h1>
                 <div className='flex flex-col mt-12 items-center justify-center h-48 w-2/3 bg-[#ffffff] shadow-lg rounded-lg gap-12 ring-1 ring-orange-400'>
                     <input disabled={formSubmitted} type='text' name='name' placeholder='Enter your name' className='font-[Poppins] font-medium text-sm text-[#212121] py-5 px-5 line-clamp-1 bg-slate-100 rounded-lg' onChange={handleInputChange}/>
                     <select disabled={formSubmitted} name='color' className='font-[Poppins] font-medium text-sm text-[#212121] py-5 px-5 line-clamp-1 bg-slate-100 rounded-lg' onChange={handleInputChange}>
                         <option value='black'>Black</option>
                         <option value='white'>White</option>
                     </select>
                 </div>
                 <div className='hover:bg-[#2790f3] mt-12 cursor-pointer font-[Poppins] font-medium text-md text-[#ffffff] py-3 px-6 w-1/5 text-center rounded-lg shadow-sm bg-[#2689e6]' onClick={registerUser} >Generate</div>
             </div>
            </div>
    )
}
