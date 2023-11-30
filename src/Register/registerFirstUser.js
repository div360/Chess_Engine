import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterFirstUser() {
    
    const navigate = useNavigate()

    useEffect(() => {
        console.log('useEffect called');
    }, []);

    const[formSubmitted, setFormSubmitted] = useState(false);

    const [user, setUser] = useState({
        id: 'randomId',
        name: '',
        color: '',
        isOnline: false
    })

    const handleInputChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value, isOnline: true})
    }

    const registerUser=()=>{
            fetch('http://localhost:8080/api/getUserId', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(response => response.json())
            .then(data => {
                setUser(data);   
                setFormSubmitted(true);       

                fetch('http://localhost:8080/api/createroom', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: data.id }),
                  })
                    .then((roomResponse) => roomResponse.json())
                    .then((roomData) => {
                      console.log('Room created:', roomData.roomId);
                      navigate(`/waitingarea/${roomData.roomId}`);
                    })
                    .catch((error) => {
                      console.error('Error creating room:', error);
                    });
            });
    }

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
