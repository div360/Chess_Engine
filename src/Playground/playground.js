import React from 'react'
import { useLocation } from 'react-router-dom'
import Board from '../Board/board'

function Playground() {
    const location = useLocation()

    const isBlackBoard = location?.state?.isBlackBoard
    const roomId = location?.state?.roomId;
    const playerId = location?.state?.playerId;

    console.log("isBlackBoard", isBlackBoard)
    console.log("roomId", roomId)
    console.log("playerId", playerId)

    return (
        <div className='h-full w-full'>
            
            <Board isBlackBoardSet={isBlackBoard} roomId={roomId} playerId={playerId}/>
    
        </div>
    )
}

export default Playground