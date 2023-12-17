import React, {  useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Board from '../Board/board'

function Playground() {
    const location = useLocation()

    const isBlackBoard = location?.state?.isBlackBoard
    const roomId = location?.state?.roomId;
    const playerId = location?.state?.playerId;

    const [start, setStart] = useState(false)

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/checkroom/${roomId}`).then(res => res.json()).then(data => {
            console.log(data)
            if(data.status === 'success'){
                setStart(true)
            }
            else{
                alert("Room not found")
                window.location.href = "/"
            }
        })
    })

    return (
        <div className='h-full w-full'>
            
            {start && <Board isBlackBoardSet={isBlackBoard} roomId={roomId} playerId={playerId}/>}
    
        </div>
    )
}

export default Playground