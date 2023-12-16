import React, { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import socket from "../Socket/socket";
import ChessAnimation from "./chessAnimation";
import { IoIosArrowRoundForward  } from "react-icons/io";
import { ChessUtilsContext } from "../Context/context";

function RegisterSecondUser () {

    const {chessUtils, setChessUtils} = useContext(ChessUtilsContext);
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
            setChessUtils({...chessUtils, selfName: user.name})
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
        <div className="h-full w-full bg-[#ffffff] flex items-center justify-center select-none">
            <ChessAnimation/>
            <div className={`flex flex-col items-center justify-center w-1/3 h-2/5 ${chessUtils?.bg} z-10`}>
                <div className={`flex flex-col items-center py-2 justify-start relative bg-white w-full h-full bottom-5 right-5 ${chessUtils?.border} border-4`}>
                    <h1 className={`font-[Monoton] ${chessUtils?.text} text-[320%]`}>8 X 8</h1>

                    <h1 className={`font-[CenturyGothic] ${chessUtils?.text} text-xl font-bold mt-5`}>Click on Join to enter the chess room</h1>

                    <div className='flex flex-row items-center justify-center w-4/5 h-max mt-10'>
                        <h1 className={`${chessUtils?.bg} text-white font-[Poppins] text-lg py-3 px-10 text-center w-1/3 ring-1 ${chessUtils?.ring}`}>Name</h1>
                        <input type='text' name='name' placeholder='Enter your name' className={`font-[Poppins] font-medium text-lg ring-1 ${chessUtils?.ring} text-[#212121] py-3 px-5 w-2/3 line-clamp-1 bg-slate-200 outline-none`} onChange={handleInputChange}/>
                    </div>
                   
                    <button onClick={handlePlayButton} className={`ring-1 ${chessUtils?.ring} text-xl text-center px-10 py-1 mt-12 font-bold ${chessUtils?.text} hover:text-white ${chessUtils?.bgHover} ease-in-out duration-200 delay-75 flex flex-row items-center`}>Let's Play <IoIosArrowRoundForward  size={40}/> </button>
                </div>
            </div>
        </div>
    )
}
export default RegisterSecondUser;